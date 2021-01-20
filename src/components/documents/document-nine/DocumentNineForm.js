import React, { useState, useEffect } from "react";
import {
  Form,
  Radio,
  Button,
  Row,
  Col,
  Input,
  Select,
  Modal,
  Divider,
  Checkbox,
  message,
  AutoComplete,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import AuthorityService from "../../../services/AuthorityService";
import Loading from "../../Loading";
import SubjectService from "../../../services/SubjectService";
import DocumentNineService from "../../../services/DocumentNineService";

const { Option } = Select;
const DocumentNineForm = ({ title }) => {
  const [creating, setCreating] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [majors, setMajors] = useState([]);
  const [authoritys, setAuthoritys] = useState([]);
  const [selectMajor, setSelectMajor] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [form] = Form.useForm();
  const rules = [{ required: true, message: "กรุณาระบุ" }];
  const { setFieldsValue } = form;
  const [showotherdocument, setShowotherdocument] = useState(false);

  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const onSearch = (searchText) => {
    const newSubject = subjects.reduce((prev, current) => {
      if (current.id_subject.includes(searchText)) {
        return [...prev, { value: current.id_subject }];
      }
      return prev;
    }, []);

    setOptions(!searchText ? [] : newSubject);
  };

  const onChange = (data) => {
    setValue(data);
  };

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
    await getSubjectAll();
    setLoading(false);
  };

  const getSubjectAll = async () => {
    try {
      const resp = await SubjectService.getSubjectAll();
      setSubjects(resp);
    } catch (error) {
      Modal.error({ title: "เกิดข้อผิดพลาดในการโหลดรายวิชา" });
    }
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

  const createDocumentNine = async (values) => {
    setCreating(true);
    try {
      const documentNineResponse = await DocumentNineService.createDocumentNine(
        values
      );
      form.resetFields();
      Modal.success({
        title: "สร้างแบบคำร้องสำเร็จ",
        content: (
          <span>รหัสสำหรับติดตามแบบคำร้องคือ {documentNineResponse.id}</span>
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

      console.log(documentNineResponse);
    } catch (error) {
      console.error(error);
      message.error("สร้างแบบคำร้องไม่สำเร็จ");
    }
    setCreating(false);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    createDocumentNine(values);
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
          tables: [{ id_subject: "", namesubject: "" }],
        }}
      >
        <h2 className="text-center">แบบคำร้องขอชำระเงินล่าช้า</h2>

        <Form.Item name="dear" label="เรียน">
          <Radio.Group>
            <Radio value="10">รองอธิการบดีประจำวิทยาเขตขอนแก่น</Radio>
            <Radio value="11">คณบดีคณะครุศาสตร์อุตสาหกรรม</Radio>
          </Radio.Group>
        </Form.Item>

        <Row gutter={[8]}>
          <Form.Item
            name="lastepaymentterm"
            label="คำร้องชำระเงินล่าช้า ภาคเรียนที่"
          >
            <Radio.Group>
              <Radio value="1">1</Radio>
              <Radio value="2">2</Radio>
              <Radio value="3">3</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="ปีการศึกษา"
            name="latepaymentyear"
            rules={[{ required: true, message: "กรุณากรอกปีการศึกษา" }]}
          >
            <Input />
          </Form.Item>
        </Row>

        <Row gutter={[8]}>
          <Form.Item name="topic" label="เรื่อง">
            <Radio.Group>
              <Radio value="10">ค่าลงทะเบียนรายวิชา</Radio>
              <Radio value="11">ค่าลาพัก/รักษาสถานภาพ</Radio>
              <Radio value="12">ค่าเพิ่มรายวิชา</Radio>
              <Radio value="13">ค่าถอนรายวิชา</Radio>
            </Radio.Group>
          </Form.Item>
        </Row>

        <div style={{ paddingLeft: 10 }}>
          <Form.Item name="otherdocument" label="(ในกรณีอื่นๆ)">
            <Checkbox
              onChange={(e) => {
                setShowotherdocument(e.target.checked);
              }}
            />
          </Form.Item>

          {showotherdocument && (
            <div style={{ paddingLeft: 15 }}>
              <Form.Item
                style={{ marginLeft: 5 }}
                name="othermassege"
                className="ml-3"
                rules={[{ required: true, message: "ระบุ" }]}
              >
                <Input />
              </Form.Item>
            </div>
          )}
        </div>
        <Divider />

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

        <Col xs={24} sm={24} md={12} span={12}>
          <Form.Item
            label="ลงชื่อนักศึกษา"
            name="signature_std"
            rules={[{ required: true, message: "กรุณาลงชื่อนักศึกษา" }]}
          >
            <Input placeholder="ตัวอย่างเช่น สติ สัมปชัญญะ" />
          </Form.Item>
        </Col>

        <label>หนังสือรับรองการเข้าเรียน</label>

        <Row gutter={[8]}>
          <Form.Item name="lastepaymentterm" label="ภาคเรียนที่">
            <Radio.Group>
              <Radio value="1">1</Radio>
              <Radio value="2">2</Radio>
              <Radio value="3">3</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="ปีการศึกษา"
            name="latepaymentyear"
            rules={[{ required: true, message: "กรุณากรอกปีการศึกษา" }]}
          >
            <Input />
          </Form.Item>
        </Row>
        <Form.List name="tables">
          {(fields, { add, remove }) => {
            return (
              <div className="text-center">
                {fields.map((field, index) => {
                  return (
                    <Row key={field.key} justify="center">
                      <Col className="pt-3" style={{ padding: 5 }}>
                        <span> ลำดับ {index + 1}</span>
                      </Col>
                      <Col>
                        <Form.Item
                          name={[field.name, "id_subject"]}
                          fieldKey={[field.fieldKey, "id_subject"]}
                          rules={rules}
                        >
                          <AutoComplete
                            style={{ width: 200, textAlign: "left" }}
                            options={options}
                            onSelect={(value) => {
                              const subject = subjects.find(
                                (subject) => subject.id_subject === value
                              );
                              const tables = form.getFieldValue(`tables`);
                              if (tables[index]) {
                                tables[index].namesubject =
                                  subject.name_subject;
                              }
                              console.log(tables);

                              setFieldsValue({
                                tables,
                              });
                            }}
                            onSearch={onSearch}
                            placeholder="รหัสวิชา"
                          />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item
                          name={[field.name, "namesubject"]}
                          fieldKey={[field.fieldKey, "namesubject"]}
                          rules={rules}
                        >
                          <Input placeholder="ชื่อวิชา" disabled />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item
                          name={[field.name, "groupstudy"]}
                          fieldKey={[field.fieldKey, "groupstudy"]}
                          rules={rules}
                        >
                          <Input placeholder="กลุ่มเรียน เช่น TEC" />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item
                          name={[field.name, "advisor"]}
                          fieldKey={[field.fieldKey, "advisor"]}
                          rules={rules}
                        >
                          <Select placeholder="ระบุอาจารย์ประจำวิชา">
                            {authoritys.map((authority) => (
                              <Option value={authority.id_authority}>
                                {authority.name_authority}{" "}
                                {authority.surname_authority}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      {fields.length > 1 && (
                        <Col flex="none">
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        </Col>
                      )}
                    </Row>
                  );
                })}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    style={{ width: "60%" }}
                  >
                    <PlusOutlined /> เพิ่มข้อมูล
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>

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
export default DocumentNineForm;

//เรียนต้องSelect
//ระดับการศึกษาต้องselect
//คณะต้องselect
