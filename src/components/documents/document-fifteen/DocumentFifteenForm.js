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
import DocumentFifteenService from "../../../services/DocumentFifteenService";

const { Option } = Select;
const DocumentFifteenForm = ({ title }) => {
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

  const createDocumentFifteen = async (values) => {
    setCreating(true);
    try {
      const documentFifteenResponse = await DocumentFifteenService.createDocumentFifteen(
        values
      );
      form.resetFields();
      Modal.success({
        title: "สร้างแบบคำร้องสำเร็จ",
        content: (
          <span>รหัสสำหรับติดตามแบบคำร้องคือ {documentFifteenResponse.id}</span>
        ),
        cancelText: false,
      });

      Modal.warning({
        title: "คำเตือน โปรดอ่านและปฏิบัติตาม",
        content: (
          <span>
            {" "}
            ( โปรดจดจำรหัสใบคำร้องเพื่อใช้ในการติดตามสถานะใบคำร้องของท่าน
            เมื่อกดปุ่ม OK)
          </span>
        ),
      });

      console.log(documentFifteenResponse);
    } catch (error) {
      console.error(error);
      message.error("สร้างแบบคำร้องไม่สำเร็จ");
    }
    setCreating(false);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    createDocumentFifteen(values);
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
        <h2 className="text-center">แบบคำร้องขอสำเร็จการศึกษา</h2>

        <Form.Item name="dear" label="เรียน">
          <Radio.Group>
            <Radio value="10">รองอธิการบดีประจำวิทยาเขตขอนแก่น</Radio>
            <Radio value="11">คณบดีคณะครุศาสตร์อุตสาหกรรม</Radio>
          </Radio.Group>
        </Form.Item>

        <Row gutter={[8]}>
          <Form.Item
            name="graduationrequestterm"
            label="คำร้องขอสำเร็จการศึกษา ภาคเรียนที่"
          >
            <Radio.Group>
              <Radio value="1">1</Radio>
              <Radio value="2">2</Radio>
              <Radio value="3">3</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="ปีการศึกษา"
            name="graduationrequestyear"
            rules={[{ required: true, message: "กรุณากรอกปีการศึกษา" }]}
          >
            <Input />
          </Form.Item>
        </Row>
        <Row gutter={[8]}>
          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="ชื่อ"
              name="name_std"
              rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
            >
              <Input placeholder="ตัวอย่างเช่น นายสติ นางสาวสติ" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="นามสกุล"
              name="surname_std"
              rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
            >
              <Input placeholder="ตัวอย่างเช่น สัมปชัญญะ" />
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
              <Input placeholder="ตัวอย่างเช่น 64322110243-4" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="เบอร์โทรศัพท์"
              name="phone_std"
              rules={[{ required: true, message: "กรุณากรอกเบอร์โทรศัพท์" }]}
            >
              <Input placeholder="ตัวอย่างเช่น 0899998888" />
            </Form.Item>
          </Col>
        </Row>

        <Col xs={24} sm={24} md={12} span={12}>
          <Form.Item label="อีเมลล์(E-mail)" name="email_std">
            <Input />
          </Form.Item>
        </Col>

        <Row gutter={[6]}>
          <Form.Item name="lveducation" label="ระดับการศึกษา">
            <Radio.Group>
              <Radio value={10}>ปวช.</Radio>
              <Radio value={11}>ปวส.</Radio>
              <Radio value={12}>ปริญญาตรี</Radio>
              <Radio value={13}>ปริญญาโท</Radio>
              <Radio value={14}>ปริญญาเอก</Radio>
            </Radio.Group>
          </Form.Item>

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
        </Row>

        <Row gutter={[10]}>
          <Form.Item name="faculty" label="คณะ">
            <Radio.Group defaultValue="11">
              {/* <Radio  value="10" disabled>คณะวิศวกรรมศาสตร์</Radio>                       */}
              <Radio value="11">คณะครุศาสตร์อุตสาหกรรม</Radio>
              {/* <Radio value="12" disabled>คณะบริหารธุรกิจและเทคโนโลยีสารสนเทศ</Radio> */}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="ชั้นปี"
            name="classyear"
            rules={[{ required: true, message: "กรุณากรอกชั้นปีที่เรียน" }]}
          >
            <Input placeholder="ตัวอย่างเช่น TEC5N" />
          </Form.Item>

          <Form.Item
            label="ระยะเวลาที่ศึกษา"
            name="timestudy"
            rules={[
              {
                required: true,
                message: "กรุณากรอกระยะเวลาที่ศึกษาตามหลักสูตรที่เรียน",
              },
            ]}
          >
            <Input placeholder="ตัวอย่างเช่น 5" />
          </Form.Item>
        </Row>

        <Row gutter={[8]}>
          <Form.Item
            name="graduationrequestterm"
            label="คำร้องขอสำเร็จการศึกษา ภาคเรียนที่"
          >
            <Radio.Group>
              <Radio value="1">1</Radio>
              <Radio value="2">2</Radio>
              <Radio value="3">3</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="ปีการศึกษา"
            name="graduationrequestyear"
            rules={[{ required: true, message: "กรุณากรอกปีการศึกษา" }]}
          >
            <Input />
          </Form.Item>
        </Row>

        <Col xs={24} sm={24} md={12} span={12}>
          <Form.Item
            label="เนื่องจาก"
            name="since"
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
            <Input placeholder="ตัวอย่างเช่น สติ สัมปชัญญะ" />
          </Form.Item>
        </Col>

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
export default DocumentFifteenForm;
