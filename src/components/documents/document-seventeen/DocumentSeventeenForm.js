import React, { useState, useEffect } from "react";
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
  AutoComplete,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import AuthorityService from "../../../services/AuthorityService";
import Loading from "../../Loading";
import SubjectService from "../../../services/SubjectService";
import DocumentSeventeenService from "../../../services/DocumentSeventeenService";

const { Option } = Select;
const mockVal = (str, repeat = 1) => {
  return {
    value: str.repeat(repeat),
  };
};
const DocumentSeventeenForm = ({ title }) => {
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

  const createDocumentSeventeen = async (values) => {
    setCreating(true);
    try {
      const documentEighteenResponse = await DocumentSeventeenService.createDocumentSeventeen(
        values
      );
      form.resetFields();
      Modal.success({
        title: "สร้างแบบคำร้องสำเร็จ",
        content: (
          <span>
            รหัสสำหรับติดตามแบบคำร้องคือ {documentEighteenResponse.id}
          </span>
        ),
        cancelText: false,
      });

      console.log(documentEighteenResponse);
    } catch (error) {
      console.error(error);
      message.error("สร้างแบบคำร้องไม่สำเร็จ");
    }
    setCreating(false);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    createDocumentSeventeen(values);
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
        <h2 className="text-center">แบบคำร้องขอเพิ่มที่นั่ง</h2>

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
          <Form.Item name="termregister" label="ได้ลงทะเบียนเรียนประจำภาคเรียน">
            <Radio.Group>
              <Radio value="10">1</Radio>
              <Radio value="11">2</Radio>
              <Radio value="12">3</Radio>
            </Radio.Group>
          </Form.Item>

          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="ปีการศึกษา"
              name="yearregister"
              rules={[{ required: true, message: "กรุณากรอกปีการศึกษา" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[6]}>
          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="มีความประสงค์ลงขอเพิ่มที่นั่ง(ในรหัสวิชา)"
              name="idsubject"
              rules={[{ required: true, message: "กรุณากรอกรหัสวิชา" }]}
            >
              <AutoComplete
                style={{ width: 200, textAlign: "left" }}
                options={options}
                onSelect={(value) => {
                  const subject = subjects.find(
                    (subject) => subject.id_subject === value
                  );
                  console.log(subject);
                  const namesubject = subject.name_subject;

                  setFieldsValue({
                    namesubject,
                  });
                }}
                onSearch={onSearch}
                placeholder="รหัสวิชา"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="ชื่อวิชา"
              name="namesubject"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อวิชา",
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="กลุ่มเรียน"
              name="groupstudy"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกกลุ่มเรียน",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="ซึ่งในปัจจุบันมีนักศึกษาที่ลงทะเบียน(จำนวน)"
              name="registernow"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกจำนวนนักเรียนที่ลงทะเบียนเรียนในปัจจุบัน",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="ยินดีให้นักศึกษาลงทะเบียนเพิ่มในรายวิชาและกลุ่มเรียนดังกล่าวได้อีก(จำนวน)"
              name="registeradd"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกจำนวนนักศึกษาที่ขอเพิ่มที่นั่ง",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
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
                          name={[field.name, "idstudent"]}
                          fieldKey={[field.fieldKey, "idstudent"]}
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
                          <Input placeholder="รหัสนักศึกษา" />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item
                          name={[field.name, "namestudent"]}
                          fieldKey={[field.fieldKey, "namestudent"]}
                          rules={rules}
                        >
                          <Input placeholder="ชื่อ" />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item
                          name={[field.name, "surnamestudent"]}
                          fieldKey={[field.fieldKey, "surnamestudent"]}
                          rules={rules}
                        >
                          <Input placeholder="นามสกุล" />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item
                          name={[field.name, "namemajor"]}
                          fieldKey={[field.fieldKey, "namemajor"]}
                          rules={rules}
                        >
                          <Select
                            placeholder="เลือกสาขาวิชา"
                            onChange={onMajorChange}
                          >
                            {majors.map((major) => (
                              <Option value={major.id_major}>
                                {major.name_major}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

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

        <label>(กรณีเทียบเพื่อเรียนแทน)</label>

        <Row gutter={[8]}>
          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item label="รหัสวิชาเดิม" name="pastidsubject">
              <AutoComplete
                style={{ width: 200, textAlign: "left" }}
                options={options}
                onSelect={(value) => {
                  const subject = subjects.find(
                    (subject) => subject.id_subject === value
                  );
                  console.log(subject);
                  const pastnamesubject = subject.name_subject;

                  setFieldsValue({
                    pastnamesubject,
                  });
                }}
                onSearch={onSearch}
                placeholder="รหัสวิชา"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item label="ชื่อวิชา" name="pastnamesubject">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[8]}>
          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item label="รหัสวิชาใหม่" name="newidsubject">
              <AutoComplete
                style={{ width: 200, textAlign: "left" }}
                options={options}
                onSelect={(value) => {
                  const subject = subjects.find(
                    (subject) => subject.id_subject === value
                  );
                  console.log(subject);
                  const newnamesubject = subject.name_subject;

                  setFieldsValue({
                    newnamesubject,
                  });
                }}
                onSearch={onSearch}
                placeholder="รหัสวิชา"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item label="ชื่อวิชา" name="newnamesubject">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

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
            label="อาจารย์ผู้สอน"
            name="teacherteath_id"
            rules={[{ required: true, message: "กรุณาระบุอาจารย์ที่ปรึกษา" }]}
          >
            <Select placeholder="กรุณาระบุอาจารย์ผู้สอน">
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
export default DocumentSeventeenForm;
