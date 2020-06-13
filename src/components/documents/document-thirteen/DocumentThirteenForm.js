import React, { useEffect, useState } from "react";
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
  InputNumber,
  message,
} from "antd";
import AuthorityService from "../../../services/AuthorityService";
import Loading from "../../Loading";
import DocumentThirteenService from "../../../services/DocumentThirteenService";

const { Option } = Select;
const DocumentThirteenForm = ({ title }) => {
  const [isLoading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [majors, setMajors] = useState([]);
  const [authoritys, setAuthoritys] = useState([]);
  const [selectMajor, setSelectMajor] = useState(null);
  const [showcertificatestudy, setShowcertificatestudy] = useState(false);
  const [showcerstudythaiversion, setShowcerstudythaiversion] = useState(false);
  const [showcerstudyengversion, setShowcerstudyengversion] = useState(false);
  const [showcertificatesuccess, setShowcertificatesuccess] = useState(false);
  const [showcersuccessthaiversion, setShowcersuccessthaiversion] = useState(
    false
  );
  const [showcertificateregister, setShowcertificateregister] = useState(false);
  const [showcerregisterthaiversion, setShowcerregisterthaiversion] = useState(
    false
  );
  const [showtranscripstudy, setShowtranscripstudy] = useState(false);
  const [showtranscripthaiversion, setShowtranscripthaiversion] = useState(
    false
  );
  const [showtranscripengversion, setShowtranscripengversion] = useState(false);
  const [showtranscripsuccess, setShowtranscripsuccess] = useState(false);
  const [showtcsuccessthaiversion, setShowtcsuccessthaiversion] = useState(
    false
  );
  const [showtcsuccessengversion, setShowtcsuccessengversion] = useState(false);
  const [showdimplomalvone, setShowdimplomalvone] = useState(false);
  const [showdpmlvonethaiversion, setShowdpmlvonethaiversion] = useState(false);
  const [showdpmlvoneengversion, setShowdpmlvoneengversion] = useState(false);
  const [showdimplomalvtwo, setShowdimplomalvtwo] = useState(false);
  const [showdpmlvtwothaiversion, setShowdpmlvtwothaiversion] = useState(false);
  const [showdpmlvtwoengversion, setShowdpmlvtwoengversion] = useState(false);
  const [showdimplomalvthree, setShowdimplomalvthree] = useState(false);
  const [showdpmlvthreethaiversion, setShowdpmlvthreethaiversion] = useState(
    false
  );
  const [showdpmlvthreeengversion, setShowdpmlvthreeengversion] = useState(
    false
  );
  const [showdimplomalvfour, setShowdimplomalvfour] = useState(false);
  const [showdpmlvfourthaiversion, setShowdpmlvfourthaiversion] = useState(
    false
  );
  const [showdpmlvfourengversion, setShowdpmlvfourengversion] = useState(false);
  const [showcertificateunit, setShowcertificateunit] = useState(false);
  const [showctfcthaiversion, setShowctfcthaiversion] = useState(false);
  const [showotherdocument, setShowotherdocument] = useState(false);
  const [showotherdocthaiversion, setShowotherdocthaiversion] = useState(false);

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

  const createDocumentThirteen = async (values) => {
    setCreating(true);
    try {
      const documentThirteenResponse = await DocumentThirteenService.createDocumentThirteen(
        values
      );
      form.resetFields();
      Modal.success({
        title: "สร้างแบบคำร้องสำเร็จ",
        content: (
          <span>
            รหัสสำหรับติดตามแบบคำร้องคือ {documentThirteenResponse.id}
          </span>
        ),
        cancelText: false,
      });

      console.log(documentThirteenResponse);
    } catch (error) {
      console.error(error);
      message.error("สร้างแบบคำร้องไม่สำเร็จ");
    }
    setCreating(false);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    createDocumentThirteen(values);
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
        <h2 className="text-center">แบบคำร้องขอเอกสารทางการศึกษา</h2>

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

        <Divider />
        <h4>กำลังศึกษาอยู่</h4>
        <div style={{ paddingLeft: 10 }}>
          <Form.Item
            name="certificatestudy"
            label=" ใบรับรองการเป็นนักศึกษา (แนบรูปถ่าย 1” สี (ชุดนักศึกษา))"
          >
            <Checkbox
              onChange={(e) => {
                setShowcertificatestudy(e.target.checked);
              }}
            />
          </Form.Item>

          {showcertificatestudy && (
            <div style={{ paddingLeft: 15 }}>
              <Row>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="cerstudythaiversion" label="ไทย">
                      <Checkbox
                        onChange={(e) => {
                          setShowcerstudythaiversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showcerstudythaiversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="cerstudyunitthai"
                          label="จำนวน"
                          className="ml-3"
                          rules={[{ required: true, message: "ระบุ" }]}
                        >
                          <InputNumber min={1} />
                        </Form.Item>
                        <span>ฉบับ</span>
                      </>
                    )}
                  </Row>
                </Col>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="cerstudyengversion" label="อังกฤษ">
                      <Checkbox
                        onChange={(e) => {
                          setShowcerstudyengversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showcerstudyengversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="cerstudyuniteng"
                          label="จำนวน"
                          className="ml-3"
                          rules={[{ required: true, message: "ระบุ" }]}
                        >
                          <InputNumber min={1} />
                        </Form.Item>
                        <span>ฉบับ</span>
                      </>
                    )}
                  </Row>
                </Col>
              </Row>
            </div>
          )}
        </div>
        <Divider />

        <div style={{ paddingLeft: 10 }}>
          <Form.Item
            name="certificatesuccess"
            label=" ใบรับรองจบทุกลักษณะรายวิชา (เสนอชื่อเข้าสภาเรียบร้อยแล้ว)"
          >
            <Checkbox
              onChange={(e) => {
                setShowcertificatesuccess(e.target.checked);
              }}
            />
          </Form.Item>

          {showcertificatesuccess && (
            <div style={{ paddingLeft: 15 }}>
              <Row>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="cerstudythaiversion" label="ไทย">
                      <Checkbox
                        onChange={(e) => {
                          setShowcersuccessthaiversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showcersuccessthaiversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="cersuccessunitthai"
                          label="จำนวน"
                          className="ml-3"
                          rules={[{ required: true, message: "ระบุ" }]}
                        >
                          <InputNumber min={1} />
                        </Form.Item>
                        <span>ฉบับ</span>
                      </>
                    )}
                  </Row>
                </Col>
              </Row>
            </div>
          )}
        </div>
        <Divider />

        <div style={{ paddingLeft: 10 }}>
          <Form.Item
            name="certificateregister"
            label=" ใบรับรองลงทะเบียนครบทุกลักษณะรายวิชาอยู่ระหว่างรอประมวลผล (แนบรูปถ่าย 1” สี (ชุดนักศึกษา)) "
          >
            <Checkbox
              onChange={(e) => {
                setShowcertificateregister(e.target.checked);
              }}
            />
          </Form.Item>

          {showcertificateregister && (
            <div style={{ paddingLeft: 15 }}>
              <Row>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="cerregisterthaiversion" label="ไทย">
                      <Checkbox
                        onChange={(e) => {
                          setShowcerregisterthaiversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showcerregisterthaiversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="cerregisterunitthai"
                          label="จำนวน"
                          className="ml-3"
                          rules={[{ required: true, message: "ระบุ" }]}
                        >
                          <InputNumber min={1} />
                        </Form.Item>
                        <span>ฉบับ</span>
                      </>
                    )}
                  </Row>
                </Col>
              </Row>
            </div>
          )}
        </div>
        <Divider />

        <div style={{ paddingLeft: 10 }}>
          <Form.Item name="transcripstudy" label=" ใบแสดงผลการศึกษา ">
            <Checkbox
              onChange={(e) => {
                setShowtranscripstudy(e.target.checked);
              }}
            />
          </Form.Item>

          {showtranscripstudy && (
            <div style={{ paddingLeft: 15 }}>
              <Row>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="transcripthaiversion" label="ไทย">
                      <Checkbox
                        onChange={(e) => {
                          setShowtranscripthaiversion(e.target.checked);
                        }}
                      />
                    </Form.Item>

                    {showtranscripthaiversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="transcripunitthai"
                          label="จำนวน"
                          className="ml-3"
                          rules={[{ required: true, message: "ระบุ" }]}
                        >
                          <InputNumber min={1} />
                        </Form.Item>
                        <span>ฉบับ</span>
                      </>
                    )}
                  </Row>
                </Col>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="transcripengversion" label="อังกฤษ">
                      <Checkbox
                        onChange={(e) => {
                          setShowtranscripengversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showtranscripengversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="transcripuniteng"
                          label="จำนวน"
                          className="ml-3"
                          rules={[{ required: true, message: "ระบุ" }]}
                        >
                          <InputNumber min={1} />
                        </Form.Item>
                        <span>ฉบับ</span>
                      </>
                    )}
                  </Row>
                </Col>
              </Row>
            </div>
          )}
        </div>
        <Divider />

        <h4>สำเร็จการศึกษา</h4>
        <div style={{ paddingLeft: 10 }}>
          <Form.Item
            name="transcripsuccess"
            label=" ใบแสดงผลการศึกษา (แนบรูปถ่าย 1” สี ปวส-ชุดนักศึกษา, ป.ตรี- ชุดครุย) "
          >
            <Checkbox
              onChange={(e) => {
                setShowtranscripsuccess(e.target.checked);
              }}
            />
          </Form.Item>

          {showtranscripsuccess && (
            <div style={{ paddingLeft: 15 }}>
              <Row>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="tcsuccessthaiversion" label="ไทย">
                      <Checkbox
                        onChange={(e) => {
                          setShowtcsuccessthaiversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showtcsuccessthaiversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="tcsuccessunitthai"
                          label="จำนวน"
                          className="ml-3"
                          rules={[{ required: true, message: "ระบุ" }]}
                        >
                          <InputNumber min={1} />
                        </Form.Item>
                        <span>ฉบับ</span>
                      </>
                    )}
                  </Row>
                </Col>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="tcsuccessengversion" label="อังกฤษ">
                      <Checkbox
                        onChange={(e) => {
                          setShowtcsuccessengversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showtcsuccessengversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="tcsuccessuniteng"
                          label="จำนวน"
                          className="ml-3"
                          rules={[{ required: true, message: "ระบุ" }]}
                        >
                          <InputNumber min={1} />
                        </Form.Item>
                        <span>ฉบับ</span>
                      </>
                    )}
                  </Row>
                </Col>
              </Row>
            </div>
          )}
        </div>
        <Divider />

        <div style={{ paddingLeft: 10 }}>
          <Form.Item
            name="dimplomalvone"
            label="ใบแทนประกาศนียบัตร /ใบแปลประกาศนียบัตร  ปวช (แนบใบแจ้งความเอกสารหาย/สําเนาใบประกาศนียบัตร) "
          >
            <Checkbox
              onChange={(e) => {
                setShowdimplomalvone(e.target.checked);
              }}
            />
          </Form.Item>

          {showdimplomalvone && (
            <div style={{ paddingLeft: 15 }}>
              <Row>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="dpmlvonethaiversion" label="ไทย">
                      <Checkbox
                        onChange={(e) => {
                          setShowdpmlvonethaiversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showdpmlvonethaiversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="dpmlvoneunitthai"
                          label="จำนวน"
                          className="ml-3"
                          rules={[{ required: true, message: "ระบุ" }]}
                        >
                          <InputNumber min={1} />
                        </Form.Item>
                        <span>ฉบับ</span>
                      </>
                    )}
                  </Row>
                </Col>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="dpmlvoneengversion" label="อังกฤษ">
                      <Checkbox
                        onChange={(e) => {
                          setShowdpmlvoneengversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showdpmlvoneengversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="dpmlvoneuniteng"
                          label="จำนวน"
                          className="ml-3"
                          rules={[{ required: true, message: "ระบุ" }]}
                        >
                          <InputNumber min={1} />
                        </Form.Item>
                        <span>ฉบับ</span>
                      </>
                    )}
                  </Row>
                </Col>
              </Row>
            </div>
          )}
        </div>
        <Divider />

        <div style={{ paddingLeft: 10 }}>
          <Form.Item
            name="dimplomalvtwo"
            label="ใบแทนประกาศนียบัตร /ใบแปลประกาศนียบัตร  ปวส (แนบใบแจ้งความเอกสารหาย/สําเนาใบประกาศนียบัตร) "
          >
            <Checkbox
              onChange={(e) => {
                setShowdimplomalvtwo(e.target.checked);
              }}
            />
          </Form.Item>

          {showdimplomalvtwo && (
            <div style={{ paddingLeft: 15 }}>
              <Row>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="dpmlvtwothaiversion" label="ไทย">
                      <Checkbox
                        onChange={(e) => {
                          setShowdpmlvtwothaiversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showdpmlvtwothaiversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="dpmlvtwounitthai"
                          label="จำนวน"
                          className="ml-3"
                          rules={[{ required: true, message: "ระบุ" }]}
                        >
                          <InputNumber min={1} />
                        </Form.Item>
                        <span>ฉบับ</span>
                      </>
                    )}
                  </Row>
                </Col>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="dpmlvtwoengversion" label="อังกฤษ">
                      <Checkbox
                        onChange={(e) => {
                          setShowdpmlvtwoengversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showdpmlvtwoengversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="dpmlvtwouniteng"
                          label="จำนวน"
                          className="ml-3"
                          rules={[{ required: true, message: "ระบุ" }]}
                        >
                          <InputNumber min={1} />
                        </Form.Item>
                        <span>ฉบับ</span>
                      </>
                    )}
                  </Row>
                </Col>
              </Row>
            </div>
          )}
        </div>
        <Divider />

        <div style={{ paddingLeft: 10 }}>
          <Form.Item
            name="dimplomalvthree"
            label=" ใบแทนปริญญาบัตร /ใบแปลปริญญาบัตร  ป.ตรี (แนบใบแจ้งความเอกสารหาย/สําเนาใบปริญญาบัตร)  "
          >
            <Checkbox
              onChange={(e) => {
                setShowdimplomalvthree(e.target.checked);
              }}
            />
          </Form.Item>

          {showdimplomalvthree && (
            <div style={{ paddingLeft: 15 }}>
              <Row>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="dpmlvthreethaiversion" label="ไทย">
                      <Checkbox
                        onChange={(e) => {
                          setShowdpmlvthreethaiversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showdpmlvthreethaiversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="dpmlvthreeunitthai"
                          label="จำนวน"
                          className="ml-3"
                          rules={[{ required: true, message: "ระบุ" }]}
                        >
                          <InputNumber min={1} />
                        </Form.Item>
                        <span>ฉบับ</span>
                      </>
                    )}
                  </Row>
                </Col>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="dpmlvthreeengversion" label="อังกฤษ">
                      <Checkbox
                        onChange={(e) => {
                          setShowdpmlvthreeengversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showdpmlvthreeengversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="dpmlvthreeuniteng"
                          label="จำนวน"
                          className="ml-3"
                          rules={[{ required: true, message: "ระบุ" }]}
                        >
                          <InputNumber min={1} />
                        </Form.Item>
                        <span>ฉบับ</span>
                      </>
                    )}
                  </Row>
                </Col>
              </Row>
            </div>
          )}
        </div>
        <Divider />

        <div style={{ paddingLeft: 10 }}>
          <Form.Item
            name="dimplomalvthree"
            label=" ใบแทนปริญญาบัตร /ใบแปลปริญญาบัตร  ป.โท (แนบใบแจ้งความเอกสารหาย/สําเนาใบปริญญาบัตร)  "
          >
            <Checkbox
              onChange={(e) => {
                setShowdimplomalvfour(e.target.checked);
              }}
            />
          </Form.Item>

          {showdimplomalvfour && (
            <div style={{ paddingLeft: 15 }}>
              <Row>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="dpmlvthreethaiversion" label="ไทย">
                      <Checkbox
                        onChange={(e) => {
                          setShowdpmlvfourthaiversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showdpmlvfourthaiversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="dpmlvfourunitthai"
                          label="จำนวน"
                          className="ml-3"
                          rules={[{ required: true, message: "ระบุ" }]}
                        >
                          <InputNumber min={1} />
                        </Form.Item>
                        <span>ฉบับ</span>
                      </>
                    )}
                  </Row>
                </Col>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="dpmlvfourengversion" label="อังกฤษ">
                      <Checkbox
                        onChange={(e) => {
                          setShowdpmlvfourengversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showdpmlvfourengversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="dpmlvfouruniteng"
                          label="จำนวน"
                          className="ml-3"
                          rules={[{ required: true, message: "ระบุ" }]}
                        >
                          <InputNumber min={1} />
                        </Form.Item>
                        <span>ฉบับ</span>
                      </>
                    )}
                  </Row>
                </Col>
              </Row>
            </div>
          )}
        </div>
        <Divider />

        <h4>บัตรนักศึกษา</h4>
        <Row gutter={[6]}>
          <Form.Item
            name="loststudentcard"
            label="ดำเนินการเกี่ยวกับบัตรนักศึกษา"
          >
            <Radio.Group>
              <Radio value="10">บัตรเดิมสูญหาย</Radio>
              <Radio value="11">
                บัตรเดิมหมดอายุหรือชํารุด (แนบบัตรเดิมประกอบ){" "}
              </Radio>
              <Radio value="12">
                {" "}
                ใบแทนบัตรนักศึกษา (บัตรชั่วคราวมีอายุ 60 วัน){" "}
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Row>

        <h4>อื่นๆ</h4>
        <div style={{ paddingLeft: 10 }}>
          <Form.Item
            name="certificateunit"
            label=" ใบรับรองจบทุกลักษณะรายวิชา (เสนอชื่อเข้าสภาเรียบร้อยแล้ว)"
          >
            <Checkbox
              onChange={(e) => {
                setShowcertificateunit(e.target.checked);
              }}
            />
          </Form.Item>

          {showcertificateunit && (
            <div style={{ paddingLeft: 15 }}>
              <Row>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="ctfcthaiversion" label="ไทย">
                      <Checkbox
                        onChange={(e) => {
                          setShowctfcthaiversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showctfcthaiversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="ctfcunitthai"
                          label="จำนวน"
                          className="ml-3"
                          rules={[{ required: true, message: "ระบุ" }]}
                        >
                          <InputNumber min={1} />
                        </Form.Item>
                        <span>ฉบับ</span>
                      </>
                    )}
                  </Row>
                </Col>
              </Row>
            </div>
          )}
        </div>
        <Divider />

        <div style={{ paddingLeft: 10 }}>
          <Form.Item name="otherdocument" label="อื่นๆ">
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
              <Row>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="otherdocthaiversion" label="ไทย">
                      <Checkbox
                        onChange={(e) => {
                          setShowotherdocthaiversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showotherdocthaiversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="otherdocunitthai"
                          label="จำนวน"
                          className="ml-3"
                          rules={[{ required: true, message: "ระบุ" }]}
                        >
                          <InputNumber min={1} />
                        </Form.Item>
                        <span>ฉบับ</span>
                      </>
                    )}
                  </Row>
                </Col>
              </Row>
            </div>
          )}
        </div>
        <Divider />

        <Col xs={24} sm={24} md={12} span={12}>
          <Form.Item
            label="ลงชื่อนักศึกษา"
            name="signature_std"
            rules={[{ required: true, message: "กรุณาลงชื่อนักศึกษา" }]}
          >
            <Input />
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
export default DocumentThirteenForm;
