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

  const [showcertificateTsc, setShowcertificateTsc] = useState(false);
  const [showcerTscthaiversion, setShowcerTscthaiversion] = useState(false);
  const [showcerTscengversion, setShowcerTscengversion] = useState(false);

  const [showcertificatestudy, setShowcertificatestudy] = useState(false);
  const [showcerstudythaiversion, setShowcerstudythaiversion] = useState(false);
  const [showcerstudyengversion, setShowcerstudyengversion] = useState(false);

  const [showcertificatesuccess, setShowcertificatesuccess] = useState(false);
  const [showcersuccessthaiversion, setShowcersuccessthaiversion] = useState(
    false
  );
  const [showcersuccessengversion, setShowcersuccessengversion] = useState(
    false
  );

  const [showcertificateregister, setShowcertificateregister] = useState(false);
  const [showcerregisterthaiversion, setShowcerregisterthaiversion] = useState(
    false
  );
  const [showcerregisterengversion, setShowcerregisterengversion] = useState(
    false
  );

  const [showotherstudy, setShowotherstudy] = useState(false);
  const [showotherstudythaiversion, setShowotherstudythaiversion] = useState(
    false
  );
  const [showotherstudyengversion, setShowotherstudyengversion] = useState(
    false
  );

  const [showcertificatestdcard, setShowcertificatestdcard] = useState(false);
  const [showcerstdcardthaiversion, setShowcerstdcardthaiversion] = useState(
    false
  );
  const [showcerstdcardengversion, setShowcerstdcardengversion] = useState(
    false
  );

  const [showtranscripsuccess, setShowtranscripsuccess] = useState(false);
  const [showtcsuccessthaiversion, setShowtcsuccessthaiversion] = useState(
    false
  );
  const [showtcsuccessengversion, setShowtcsuccessengversion] = useState(false);

  const [showboardcerapprove, setShowboardcerapprove] = useState(false);
  const [
    showboardcerapprovethaiversion,
    setShowboardcerapprovethaiversion,
  ] = useState(false);
  const [
    showboardcerapproveengversion,
    setShowboardcerapproveengversion,
  ] = useState(false);

  const [showcersuccessstudy, setShowcersuccessstudy] = useState(false);
  const [
    showcersuccessstudythaiversion,
    setShowcersuccessstudythaiversion,
  ] = useState(false);
  const [
    showcersuccessstudyengversion,
    setShowcersuccessstudyengversion,
  ] = useState(false);

  const [showsubstitudedimploma, setShowsubstitudedimploma] = useState(false);
  const [
    showsubstitudedimplomathaiversion,
    setShowsubstitudedimplomathaiversion,
  ] = useState(false);

  const [showsubstitudedegree, setShowsubstitudedegree] = useState(false);
  const [
    showsubstitudedegreethaiversion,
    setShowsubstitudedegreethaiversion,
  ] = useState(false);

  const [showTranslationdimploma, setShowTranslationdimploma] = useState(false);
  const [
    showTranslationdimplomaengversion,
    setShowTranslationdimplomaengversion,
  ] = useState(false);

  const [showTranslationdegree, setShowTranslationdegree] = useState(false);
  const [
    showTranslationdegreeengversion,
    setShowTranslationdegreeengversion,
  ] = useState(false);

  const [showothersuccessstudy, setShowothersuccessstudy] = useState(false);
  const [
    showothersuccessstudythaiversion,
    setShowothersuccessstudythaiversion,
  ] = useState(false);
  const [
    showothersuccessstudyengversion,
    setShowothersuccessstudyengversion,
  ] = useState(false);

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
              label="ชื่อ(ภาษาอังกฤษ)"
              name="nameeng"
              rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="นามสกุล(ภาษาอังกฤษ)"
              name="surnameeng"
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

        <Row gutter={[6]}>
          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="ที่อยู่ปัจจุบัน"
              name="currentaddress"
              rules={[{ required: true, message: "กรุณากรอกที่อยู่ปัจจุบัน" }]}
            >
              <Input placeholder="ตัวอย่างเช่น 5/99 ม.6 ต.โนนสมบูรณ์ อ.บ้านแฮด จ.ขอนแก่น 40110" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item
              label="วันที่เข้าศึกษา"
              name="daystudy"
              rules={[{ required: true, message: "กรุณากรอกวันที่เข้าศึกษา" }]}
            >
              <Input placeholder="ตัวอย่างเช่น 12 สิงคมหา พ.ศ.2556" />
            </Form.Item>
          </Col>
        </Row>
        <Col xs={24} sm={24} md={12} span={12}>
          <Form.Item
            label="วันที่สำเร็จการศึกษา (กรณีคนที่สำเร็จการศึกษา)"
            name="daysuccessstudy"
          >
            <Input placeholder="ตัวอย่างเช่น 12 มีนาคม พ.ศ. 2563" />
          </Form.Item>
        </Col>

        <Divider />
        <h4>กำลังศึกษาอยู่</h4>

        <div style={{ paddingLeft: 10 }}>
          <Form.Item
            name="certificateTsc"
            label=" หนังสือรับรองผลการศึกษา (ไม่ต้องแนบรูปถ่าย)"
          >
            <Checkbox
              onChange={(e) => {
                setShowcertificateTsc(e.target.checked);
              }}
            />
          </Form.Item>

          {showcertificateTsc && (
            <div style={{ paddingLeft: 15 }}>
              <Row>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="cerTscthaiversion" label="ไทย">
                      <Checkbox
                        onChange={(e) => {
                          setShowcerTscthaiversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showcerTscthaiversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="cerTscunitthai"
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
                    <Form.Item name="cerTscengversion" label="อังกฤษ">
                      <Checkbox
                        onChange={(e) => {
                          setShowcerTscengversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showcerTscengversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="cerTscuniteng"
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
            name="certificatestudy"
            label=" หนังสือรับรองการเป็นนักศึกษา (แนบรูปถ่าย 1” สี (ชุดนักศึกษา))"
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
            name="certificateregister"
            label=" หนังสือรับรองลงทะเบียนครบตามโครงสร้างหลักสูตร (ก่อนการอนุมัติการศึกษาประจำภาค ไม่ต้องแนบรูปถ่าย)"
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
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="cerregisterengversion" label="อังกฤษ">
                      <Checkbox
                        onChange={(e) => {
                          setShowcerregisterengversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showcerregisterengversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="cerregisteruniteng"
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
            label=" หนังสือรับรองจบทุกลักษณะรายวิชา (หลังการอนุมัติการศึกษาประจำภาค รอสภามหาวิทยาลัยฯ อนมุติ ไม่ต้องแนบรูปถ่าย)"
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
                    <Form.Item name="cersuccessthaiversion" label="ไทย">
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
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="cersuccessengversion" label="อังกฤษ">
                      <Checkbox
                        onChange={(e) => {
                          setShowcersuccessengversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showcersuccessengversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="cersuccessuniteng"
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
            name="certificatestdcard"
            label=" ใบแทนบัตรประจำตัวนักศึกษา(ไม่ต้องแนบรูปถ่าย) "
          >
            <Checkbox
              onChange={(e) => {
                setShowcertificatestdcard(e.target.checked);
              }}
            />
          </Form.Item>

          {showcertificatestdcard && (
            <div style={{ paddingLeft: 15 }}>
              <Row>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="cerstdcardthaiversion" label="ไทย">
                      <Checkbox
                        onChange={(e) => {
                          setShowcerstdcardthaiversion(e.target.checked);
                        }}
                      />
                    </Form.Item>

                    {showcerstdcardthaiversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="cerstdcardunitthai"
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
                    <Form.Item name="cerstdcardengversion" label="อังกฤษ">
                      <Checkbox
                        onChange={(e) => {
                          setShowcerstdcardengversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showcerstdcardengversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="cerstdcarduniteng"
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
          <Form.Item name="otherstudy" label=" หนังสือรับรองอื่นๆ (ระบุ)">
            <Checkbox
              onChange={(e) => {
                setShowotherstudy(e.target.checked);
              }}
            />
          </Form.Item>

          {showotherstudy && (
            <div style={{ paddingLeft: 15 }}>
              <Form.Item
                style={{ marginLeft: 5 }}
                name="otherstudymessage"
                className="ml-3"
                rules={[{ required: true, message: "ระบุ" }]}
              >
                <Input />
              </Form.Item>
              <Row>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="otherstudythaiversion" label="ไทย">
                      <Checkbox
                        onChange={(e) => {
                          setShowotherstudythaiversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showotherstudythaiversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="otherstudyunitthai"
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
                    <Form.Item name="otherstudyengversion" label="อังกฤษ">
                      <Checkbox
                        onChange={(e) => {
                          setShowotherstudyengversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showotherstudyengversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="otherstudyuniteng"
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
            label=" ใบแสดงผลการศึกษา (นักศึกษาที่สำเร็จการศึกษาตั้งแต่ปีการศึกษา 2558 เป็นต้นไป ไม่ต้องแนบรูปถ่าย) "
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
            name="boardcerapprove"
            label=" ใบรับรองสภามหาวิทยาลัยอนุมัติให้สำเร็จการศึกษา (แนบรูปถ่ายชุดครุย 1 นิ้ว) "
          >
            <Checkbox
              onChange={(e) => {
                setShowboardcerapprove(e.target.checked);
              }}
            />
          </Form.Item>

          {showboardcerapprove && (
            <div style={{ paddingLeft: 15 }}>
              <Row>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="boardcerapprovethaiversion" label="ไทย">
                      <Checkbox
                        onChange={(e) => {
                          setShowboardcerapprovethaiversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showboardcerapprovethaiversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="boardcerapproveunitthai"
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
                    <Form.Item name="boardcerapproveengversion" label="อังกฤษ">
                      <Checkbox
                        onChange={(e) => {
                          setShowboardcerapproveengversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showboardcerapproveengversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="boardcerapproveuniteng"
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
            name="cersuccessstudy"
            label=" ใบรับรองสำเร็จการศึกษา (ไม่ต้องแนบรูปถ่าย) "
          >
            <Checkbox
              onChange={(e) => {
                setShowcersuccessstudy(e.target.checked);
              }}
            />
          </Form.Item>

          {showcersuccessstudy && (
            <div style={{ paddingLeft: 15 }}>
              <Row>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="cersuccessstudythaiversion" label="ไทย">
                      <Checkbox
                        onChange={(e) => {
                          setShowcersuccessstudythaiversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showcersuccessstudythaiversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="cersuccessstudyunitthai"
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
                    <Form.Item name="cersuccessstudyengversion" label="อังกฤษ">
                      <Checkbox
                        onChange={(e) => {
                          setShowcersuccessstudyengversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showcersuccessstudyengversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="cersuccessstudyuniteng"
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
            name="substitudedimploma"
            label=" ใบแทนใบประกาศนียบัตร (เฉพาะกรณีที่สูญหาย)(แนบรูปถ่ายชุดนักศึกษา 1 นิ้ว) "
          >
            <Checkbox
              onChange={(e) => {
                setShowsubstitudedimploma(e.target.checked);
              }}
            />
          </Form.Item>

          {showsubstitudedimploma && (
            <div style={{ paddingLeft: 15 }}>
              <Row>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="substitudedimplomathaiversion" label="ไทย">
                      <Checkbox
                        onChange={(e) => {
                          setShowsubstitudedimplomathaiversion(
                            e.target.checked
                          );
                        }}
                      />
                    </Form.Item>
                    {showsubstitudedimplomathaiversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="substitudedimplomaunitthai"
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
            name="substitudedegree"
            label=" ใบแทนใบปริญญาบัตร (เฉพาะกรณีที่สูญหาย)(แนบรูปถ่ายชุดครุย 1 นิ้ว) "
          >
            <Checkbox
              onChange={(e) => {
                setShowsubstitudedegree(e.target.checked);
              }}
            />
          </Form.Item>

          {showsubstitudedegree && (
            <div style={{ paddingLeft: 15 }}>
              <Row>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="substitudedegreethaiversion" label="ไทย">
                      <Checkbox
                        onChange={(e) => {
                          setShowsubstitudedegreethaiversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showsubstitudedegreethaiversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="substitudedegreeunitthai"
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
            name="Translationdimploma"
            label=" ใบแปลใบประกาศนียบัตร(ให้แนบสำเนาฉบับภาษาไทย) "
          >
            <Checkbox
              onChange={(e) => {
                setShowTranslationdimploma(e.target.checked);
              }}
            />
          </Form.Item>

          {showTranslationdimploma && (
            <div style={{ paddingLeft: 15 }}>
              <Row>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item
                      name="Translationdimplomaengversion"
                      label="อังกฤษ"
                    >
                      <Checkbox
                        onChange={(e) => {
                          setShowTranslationdimplomaengversion(
                            e.target.checked
                          );
                        }}
                      />
                    </Form.Item>
                    {showTranslationdimplomaengversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="Translationdimplomauniteng"
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
            name="Translationdegree"
            label=" ใบแปลใบปริญญาบัตร(ให้แนบสำเนาฉบับภาษาไทย) "
          >
            <Checkbox
              onChange={(e) => {
                setShowTranslationdegree(e.target.checked);
              }}
            />
          </Form.Item>

          {showTranslationdegree && (
            <div style={{ paddingLeft: 15 }}>
              <Row>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item
                      name="Translationdegreeengversion"
                      label="อังกฤษ"
                    >
                      <Checkbox
                        onChange={(e) => {
                          setShowTranslationdegreeengversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showTranslationdegreeengversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="Translationdegreeuniteng"
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
            name="othersuccessstudy"
            label=" หนังสือรับรองอื่นๆ (ระบุ)"
          >
            <Checkbox
              onChange={(e) => {
                setShowothersuccessstudy(e.target.checked);
              }}
            />
          </Form.Item>

          {showothersuccessstudy && (
            <div style={{ paddingLeft: 15 }}>
              <Form.Item
                style={{ marginLeft: 5 }}
                name="othersuccessstudymessage"
                className="ml-3"
                rules={[{ required: true, message: "ระบุ" }]}
              >
                <Input />
              </Form.Item>
              <Row>
                <Col xs={24} sx={24} lg={12} span={12}>
                  <Row>
                    <Form.Item name="othersuccessstudythaiversion" label="ไทย">
                      <Checkbox
                        onChange={(e) => {
                          setShowothersuccessstudythaiversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showothersuccessstudythaiversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="othersuccessstudyunitthai"
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
                    <Form.Item
                      name="othersuccessstudyengversion"
                      label="อังกฤษ"
                    >
                      <Checkbox
                        onChange={(e) => {
                          setShowothersuccessstudyengversion(e.target.checked);
                        }}
                      />
                    </Form.Item>
                    {showothersuccessstudyengversion && (
                      <>
                        <Form.Item
                          style={{ marginLeft: 5 }}
                          name="othersuccessstudyuniteng"
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
