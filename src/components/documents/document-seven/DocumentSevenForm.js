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
  AutoComplete,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import AuthorityService from "../../../services/AuthorityService";
import Loading from "../../Loading";
import DocumentSevenService from "../../../services/DocumentSevenService";
import SubjectService from "../../../services/SubjectService";

const { Option } = Select;
const mockVal = (str, repeat = 1) => {
  return {
    value: str.repeat(repeat),
  };
};
const DocumentSevenForm = ({ title }) => {
  const [creating, setCreating] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [majors, setMajors] = useState([]);
  const [authoritys, setAuthoritys] = useState([]);
  const [selectMajor, setSelectMajor] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [form] = Form.useForm();
  const rules = [{ required: true, message: "กรุณาระบุ" }];
  const { setFieldsValue } = form;

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

  const createDocumentSeven = async (values) => {
    setCreating(true);
    try {
      const documentSevenResponse = await DocumentSevenService.createDocumentSeven(
        values
      );
      form.resetFields();
      Modal.success({
        title: "สร้างแบบคำร้องสำเร็จ",
        content: (
          <span>รหัสสำหรับติดตามแบบคำร้องคือ {documentSevenResponse.id}</span>
        ),
        cancelText: false,
      });

      console.log(documentSevenResponse);
    } catch (error) {
      console.error(error);
      message.error("สร้างแบบคำร้องไม่สำเร็จ");
    }
    setCreating(false);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    createDocumentSeven(values);
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
        <h2 className="text-center">แบบคำร้องขอถอนรายวิชาล่าช้า</h2>
        <Row gutter={[8]}>
          <Form.Item name="a" label="เรียน">
            <Radio.Group>
              <Radio value="10">รองอธิการบดีประจำวิทยาเขตขอนแก่น</Radio>
              <Radio value="11">คณบดี</Radio>
              <Radio value="12">คณะวิศวกรรมศาสตร์</Radio>
              <Radio value="13">คณะครุศาสตร์อุตสาหกรรม</Radio>
              <Radio value="14">คณะบริหารธุรกิจและเทคโนโลยีสารสนเทศ</Radio>
            </Radio.Group>
          </Form.Item>
        </Row>
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
        <Row gutter={[6]}>
          <Form.Item name="lveducation" label="ระดับการศึกษา">
            <Radio.Group>
              <Radio value="10">ปวส.</Radio>
              <Radio value="11">ป.ตรี</Radio>
              <Radio value="12">ป.โทร</Radio>
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

        <Row gutter={[6]}>
          <Form.Item name="termregister" label="ได้ลงทะเบียนเรียนภาคเรียนที่">
            <Radio.Group>
              <Radio value="10">1</Radio>
              <Radio value="11">2</Radio>
              <Radio value="12">3</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="ปีการศึกษา"
            name="yearregister"
            rules={[{ required: true, message: "กรุณากรอกปีการศึกษา" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="จำนวนทั้งสิ้น(หน่วยกิต)"
            name="termtotalunit"
            rules={[{ required: true, message: "กรุณากรอกปีการศึกษา" }]}
          >
            <Input />
          </Form.Item>
        </Row>

        <Col xs={24} sm={24} md={12} span={12}>
          <Form.Item
            label="มีความประสงค์ขอถอนรายวิช้า(จำนนวนหนน่วยกิต)"
            name="withdrawregisterunit"
            rules={[
              { required: true, message: "กรุณากรอกเหตุผลที่ต้องการดำเนินการ" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} span={12}>
          <Form.Item
            label="โดยคงเหลือหน่วยกิตในภาคเรียนนี้(จำนนวนหนน่วยกิต)"
            name="remainunit"
            rules={[
              { required: true, message: "กรุณากรอกเหตุผลที่ต้องการดำเนินการ" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <label>
          รายละเอียดวิชาดังนี้
          (กรณีวิชาที่คงเหลือต่ำกว่าเกณฑ์ที่กำหนดต้องยื่นคำร้องขอลงทะเบียนเรียนต่ำกว่าเกณฑ์ที่กำหนด)
        </label>
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
                          name={[field.name, "subject"]}
                          fieldKey={[field.fieldKey, "subject"]}
                          rules={rules}
                        >
                          {/* <Input
                            placeholder="รหัสวิชา"
                            onChange={() => {
                              const tables = form.getFieldValue(`tables`);
                              if (tables[index]) {
                                tables[index].namesubject = "test";
                              }
                              console.log(tables);

                              setFieldsValue({
                                tables,
                              });
                            }}
                          /> */}
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
                                tables[index].unit_subject =
                                  subject.unit_subject;
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
                          name={[field.name, "unit_subject"]}
                          fieldKey={[field.fieldKey, "unit_subject"]}
                          rules={rules}
                        >
                          <Input placeholder="หน่วยกิต" disabled />
                        </Form.Item>
                      </Col>
                      {/* <Col>
                        <Form.Item
                          name={[field.name, "advisor_id"]}
                          fieldKey={[field.fieldKey, "advisor_id"]}
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
                      </Col> */}
                      <Col>
                        <Form.Item
                          name={[field.name, "note"]}
                          fieldKey={[field.fieldKey, "note"]}
                        >
                          <Input placeholder="หมายเหตุ" />
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
                    <PlusOutlined /> Add field
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>

        <Col xs={24} sm={24} md={12} span={12}>
          <Form.Item
            label="ลงชื่อนักศึกษา"
            name="signature_std"
            rules={[{ required: true, message: "กรุณาลงชื่อนักศึกษา" }]}
          >
            <Input />
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
export default DocumentSevenForm;
