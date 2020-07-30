import React, { useEffect, useState } from "react";
import {
  Form,
  Radio,
  Button,
  Row,
  Col,
  Input,
  Select,
  Divider,
  Modal,
  message,
} from "antd";
import AuthorityService from "../../../services/AuthorityService";
import Loading from "../../Loading";
import DocumentTwelveService from "../../../services/DocumentTwelveService";

const { Option } = Select;
const DocumentTwelveForm = ({ title }) => {
  const [isLoading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [majors, setMajors] = useState([]);
  const [authoritys, setAuthoritys] = useState([]);
  const [selectMajor, setSelectMajor] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    getMajor();
  }, []);

  const getMajor = async () => {
    try {
      const reps = await AuthorityService.getMajors();
      setMajors(reps.data);
      console.log(reps);
    } catch (error) {
      Modal.error({ title: "เกิดข้อผิดพลาดในการโหลดข้อมูลสาขา" });
    }
    await getAuthorityAll();
    setLoading(false);
  };

  const getAuthorityAll = async () => {
    try {
      const reps = await AuthorityService.getAuthorityAll();
      setAuthoritys(reps.data);
      console.log(reps);
    } catch (error) {
      Modal.error({ title: "เกิดข้อผิดพลาดในการโหลดข้อมูลบุคลากร" });
    }
  };

  const onMajorChange = (e) => {
    setSelectMajor(e);
    const { setFieldsValue } = form;
    setFieldsValue({ advisor_id: "" });
    setFieldsValue({ mastersubject_id: "" });
  };

  const createDocumentTwelve = async (values) => {
    setCreating(true);
    try {
      const documentTwelveResponse = await DocumentTwelveService.createDocumentTwelve(
        values
      );
      form.resetFields();
      Modal.success({
        title: "สร้างแบบคำร้องสำเร็จ",
        content: (
          <span>รหัสสำหรับติดตามแบบคำร้องคือ {documentTwelveResponse.id}</span>
        ),
        cancelText: false,
      });

      console.log(documentTwelveResponse);
    } catch (error) {
      console.error(error);
      message.error("สร้างแบบคำร้องไม่สำเร็จ");
    }
    setCreating(false);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    createDocumentTwelve(values);
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Form
        form={form}
        name="validate_other"
        className="mt-3 doc-form"
        onFinish={onFinish}
        initialValues={{
          "input-number": 3,
          "checkbox-group": ["A", "B"],
          rate: 3.5,
        }}
      >
        <h2 className="text-center">แบบคำร้องขอลาออกจากการเป็นนักศึกษา</h2>

        <Row gutter={[8]}>
          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="ชื่อ"
              name="name_std"
              rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="นามสกุล"
              name="surname_std"
              rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[8]}>
          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="รหัสนักศึกษา"
              name="id_std"
              rules={[{ required: true, message: "กรุณากรอกรหัสนักศึกษา" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="เบอร์โทรศัพท์"
              name="phone_std"
              rules={[{ required: true, message: "กรุณากรอกเบอร์โทรศัพท์" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Col xs={24} sm={24} md={12} span={12}>
          <Form.Item
            label="อีเมลล์(E-mail)"
            name="email_std"
            rules={[{ required: true, message: "กรุณากรอกอีเมลล์(E-mail)" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Form.Item name="lveducation" label="ระดับการศึกษา">
          <Radio.Group>
            <Radio value={10}>ปวช.</Radio>
            <Radio value={11}>ปวส.</Radio>
            <Radio value={12}>ปริญญาตรี</Radio>
            <Radio value={13}>ปริญญาโท</Radio>
            <Radio value={14}>ปริญญาเอก</Radio>
          </Radio.Group>
        </Form.Item>

        <Row gutter={[6]}>
          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="สาขาวิชา"
              name="name_major"
              rules={[{ required: true, message: "กรุณากรอกสาขาวิชา" }]}
            >
              <Select placeholder="เลือกสาขาวิชา" onChange={onMajorChange}>
                {majors.map((major) => (
                  <Option value={major.id_major}>{major.name_major}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Form.Item name="faculty" label="คณะ">
            <Radio.Group defaultValue="11">
              {/* <Radio  value="10" disabled>คณะวิศวกรรมศาสตร์</Radio>                       */}
              <Radio value="11">คณะครุศาสตร์อุตสาหกรรม</Radio>
              {/* <Radio value="12" disabled>คณะบริหารธุรกิจและเทคโนโลยีสารสนเทศ</Radio> */}
            </Radio.Group>
          </Form.Item>
        </Row>

        <Row gutter={[8]}>
          <Form.Item
            label="เกิดวันที่"
            name="dayborn"
            rules={[{ required: true, message: "กรุณากรอกวันที่เกิด" }]}
          >
            <Input placeholder="ตัวอย่างเช่น 12" />
          </Form.Item>

          <Form.Item
            label="เดือนที่เกิด"
            name="monthborn"
            rules={[{ required: true, message: "กรุณากรอกเดือนที่เกิด" }]}
          >
            <Input placeholder="ตัวอย่างเช่น สิงหาคม" />
          </Form.Item>

          <Form.Item
            label="ปี พ.ศ.ที่เกิด"
            name="yearborn"
            rules={[{ required: true, message: "กรุณากรอกปี พ.ศ.ที่เกิด" }]}
          >
            <Input placeholder="ตัวอย่างเช่น 2537" />
          </Form.Item>

          <Form.Item
            label="อายุ"
            name="ageborn"
            rules={[{ required: true, message: "กรุณากรอกอายุ" }]}
          >
            <Input placeholder="ตัวอย่างเช่น 26" />
          </Form.Item>
        </Row>

        <Col xs={24} sm={24} md={12} span={12}>
          <Form.Item
            label="มีความประสงค์ขอลาออกจากการเป็นนักศึกษา เนื่องจาก(โปรดระบุ)"
            name="resignsince"
            rules={[
              { required: true, message: "กรุณากรอกเหตุผลที่ต้องการดำเนินการ" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} span={12}>
          <Form.Item
            label="ลงชื่อนักศึกษา"
            name="signature_std"
            rules={[{ required: true, message: "กรุณาลงชื่อนักศึกษา" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <h3 className="text-center">คำยินยอมของผู้ปกครอง</h3>
        <Row gutter={[8]}>
          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="ชื่อ"
              name="nameparent"
              rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="นามสกุล"
              name="surname"
              rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[6]}>
          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="เบอร์โทรศัพท์"
              name="phoneparent"
              rules={[{ required: true, message: "กรุณากรอกเบอร์โทรศัพท์" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="ลงชื่อผู้ปกครอง"
              name="signatureparent"
              rules={[{ required: true, message: "กรุณาลงชื่อผู้ปกครอง" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Divider />
        <h4>สาขาวิชาที่นักศึกษาสังกัด</h4>
        <Col xs={24} sm={24} md={12} span={12}>
          <Form.Item
            label="อาจารย์ที่ปรึกษา"
            name="advisor_id"
            rules={[{ required: true, message: "กรุณาระบุอาจารย์ที่ปรึกษา" }]}
          >
            <Select placeholder="กรุณาระบุอาจารย์ที่ปรึกษา">
              {authoritys
                .filter((authority) => {
                  if (!authority.major) {
                    return false;
                  }
                  return authority.major.id_major === selectMajor;
                })
                .map((authority) => (
                  <Option value={authority.id_authority}>
                    {authority.name_authority} {authority.surname_authority}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} span={12}>
          <Form.Item
            label="หัวหน้าสาขา"
            name="mastersubject_id"
            rules={[{ required: true, message: "กรุณาระบุหัวหน้าสาขา" }]}
          >
            <Select placeholder="กรุณาระบุหัวหน้าสาขา">
              {authoritys
                .filter((authority) => {
                  if (!authority.major) {
                    return false;
                  }
                  return authority.major.id_major === selectMajor;
                })
                .map((authority) => (
                  <Option value={authority.id_authority}>
                    {authority.name_authority} {authority.surname_authority}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>

        <div className="text-right">
          <Button
            type="primary"
            htmlType="submit"
            loading={creating}
            disabled={creating}
          >
            ส่งคำร้อง
          </Button>
        </div>
      </Form>
    );
  }
};
export default DocumentTwelveForm;
