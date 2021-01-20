import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  Image,
  Canvas,
  PDFViewer,
} from "@react-pdf/renderer";
import { Button, Collapse } from "antd";
import moment from "moment";
import { convertToThaiYear } from "../../helpers/time";
import { dearNumberToString } from "../../helpers/dear";
import { lveducationNumberToString } from "../../helpers/lveducation";
import { endpointUrl } from "../../config";

const DocumentOnePDF = ({ document }) => {
  Font.register({
    family: "Kanit",
    src: "./Sarabun-Medium.ttf",
  });

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Kanit",
    },
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
      fontFamily: "Kanit",
    },
    title: {
      fontSize: 16,
      textAlign: "center",
      fontFamily: "Kanit",
    },
    author: {
      fontSize: 12,
      textAlign: "center",
      // marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: "Kanit",
    },
    text: {
      margin: 3,
      fontSize: 12,
      // textAlign: "justify",
      fontFamily: "Kanit",
    },
    textbody: {
      margin: 3,
      fontSize: 9,
      // textAlign: "justify",
      fontFamily: "Kanit",
    },
    textbodytwo: {
      textIndent: 40,
      margin: 3,
      fontSize: 9,
      // textAlign: "justify",
      fontFamily: "Kanit",
    },

    textbodythree: {
      textIndent: 5,
      margin: 3,
      fontSize: 8,
      // textAlign: "justify",
      fontFamily: "Kanit",
    },

    bodybd: {
      width: "210",
      left: "50",
      borderStyle: "solid",
      borderWidth: 1,
      margin: 10,
    },

    bodybdre: {
      width: "100",

      borderStyle: "solid",
      borderWidth: 0,
      margin: 0,
    },
    tableRowbdre: { margin: "auto", flexDirection: "row" },
    tableColbdre: {
      width: "20",
      borderStyle: "solid",
      borderWidth: 0,
    },

    bodybdsig: {
      width: "270",
      borderStyle: "solid",
      borderWidth: 0,
      margin: 0,
    },

    tableRowbd: { margin: "auto", flexDirection: "row" },
    tableColbd: {
      width: "210",
      borderStyle: "solid",
      borderWidth: 1,
    },

    tableRowsig: { margin: "auto", flexDirection: "row" },
    tableColsig: {
      width: "270",
      borderStyle: "solid",
      borderWidth: 1,
    },

    tableColsigre: {
      width: "270",
      borderStyle: "solid",
      borderWidth: 0,
      borderRightWidth: 1,
    },

    tableColbdtwo: {
      width: "210",
      borderStyle: "solid",
      borderWidth: 0,
    },

    textsig: {
      textIndent: 0,
      margin: 3,
      fontSize: 8,
      fontFamily: "Kanit",
    },

    textheadre: {
      textIndent: 5,
      margin: 3,
      fontSize: 6,
      fontFamily: "Kanit",
    },

    textsigtwo: {
      margin: 1,
      fontSize: 8,
      fontFamily: "Kanit",
      textIndent: 70,
    },

    textsigthree: {
      margin: 1,
      fontSize: 8,
      fontFamily: "Kanit",
      textIndent: 80,
    },

    textday: {
      // margin: 12,
      fontSize: 10,
      textAlign: "right",
      fontFamily: "Kanit",
    },

    texttopic: {
      margin: 4,
      fontSize: 11,
      textAlign: "left",
      fontFamily: "Kanit",
    },
    image: {
      width: 50,
      height: 25,
      marginLeft: "auto",
      marginRight: "auto",
    },
    imagehead: {
      width: 20,
      height: 40,
      // marginLeft: "auto",
      // marginRight: "auto",
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
    checkBox: {
      width: 16,
      borderStyle: "solid",
      display: "flex",
      borderWidth: 1,
      minWidth: 16,
      minHeight: 16,
      height: 16,
      marginTop: 10,
      marginBottom: 10,
      fontSize: 20,
    },
    checked: {
      position: "absolute",
      right: 1,
      bottom: 0.5,
    },

    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
    },
    tableRow: { margin: "auto", flexDirection: "row" },
    tableCol: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
    textCenter: {
      textAlign: "center",
      display: "flex",
      width: "100%",
      justifyContent: "center",
    },

    textsigad: {
      textIndent: 0,
      margin: 1,
      fontSize: 8,
      fontFamily: "Kanit",
    },

    textsigadtwo: {
      margin: 1,
      fontSize: 8,
      fontFamily: "Kanit",
      textIndent: 5,
    },

    textsigadthree: {
      margin: 1,
      fontSize: 8,
      fontFamily: "Kanit",
      textIndent: 115,
    },

    textsigadfour: {
      margin: 10,
      fontSize: 8,
      fontFamily: "Kanit",

      textIndent: 10,
    },
  });

  const renderCheckBox = (checked) => {
    if (checked) {
      return (
        <View style={styles.checkBox}>
          <Text style={styles.checked}>/</Text>
        </View>
      );
    }
    return (
      <View style={styles.checkBox}>
        <Text style={styles.checked}></Text>
      </View>
    );
  };
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.bodybdre}>
          <View style={styles.tableRowbdre}>
            <View style={styles.tableColbdre}>
              <View style={styles.textCenter}>
                <Image
                  style={styles.imagehead}
                  src="http://localhost:5000/upload/signature/RMUTI_KORAT.png"
                />
              </View>
            </View>
            <View style={styles.tableColbdtwo}>
              <Text style={styles.textheadre}>
                มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน วิทยาเขตขอนแก่น
              </Text>

              <Text style={styles.textheadre}>
                Rajamangala University of Technology Isan Khonkean Campus
              </Text>
            </View>
          </View>
        </View>

        {/* {renderCheckBox(true)} */}

        {/* <Text style={styles.text}>
          {convertToThaiYear(moment(new Date()).format("LL"))}
          {convertToThaiYear(moment(new Date()).format("L"))}
        </Text> */}

        <Text style={styles.title}>แบบคำร้อง</Text>
        <Text style={styles.author}>General Reqest Form </Text>
        <Text style={styles.textday}>
          {convertToThaiYear(moment(new Date()).format("LL"))}
        </Text>
        <Text style={styles.texttopic}>
          เรื่อง (Title) {document.type_one.topic}{" "}
        </Text>
        <Text style={styles.texttopic}>
          เรียน (To) {dearNumberToString(document.type_one.dear)}{" "}
        </Text>

        <Text style={styles.textbodytwo}>
          ข้าพเจ้า Name {document.student.name_std}{" "}
          {document.student.surname_std} รหัสนักศึกษา(Student ID)
          {document.student.id_std} ระดับการศึกษา(Student Level){" "}
          {lveducationNumberToString(document.student.lveducation)}
        </Text>

        <Text style={styles.textbody}>
          คณะ (Faculty) {document.student.major.faculty.name_faculty} สาขาวิชา
          (Field of study) {document.student.major.name_major} ชั้นปีที่ (Class
          Level) {document.type_one.classyear}{" "}
        </Text>

        <Text style={styles.textbody}>
          ระยะเวลาการศึกษา (Duration of study) {document.type_one.timestudy}{" "}
          ปี(year)
        </Text>

        <Text style={styles.textbodytwo}>
          มีความประสงค์ (I would like to) {document.type_one.purpose}
        </Text>

        <Text style={styles.textbodytwo}>
          จึงเรียนมาเพื่อโปรดพิจารณา (Please consider my request)
        </Text>

        <View style={styles.bodybd}>
          <View style={styles.tableRowbd}>
            <View style={styles.tableColbd}>
              {/* <View style={styles.bodybd}> */}
              <Text style={styles.textbodythree}>
                {" "}
                สำหรับติดต่อนักศึกษา : To contact student
              </Text>

              <Text style={styles.textbodythree}>
                {" "}
                โทร/Tel:
                {document.student.phone_std}
              </Text>

              <Text style={styles.textbodythree}>
                {" "}
                E-mail: {document.student.email_std}
              </Text>
            </View>
            <View style={styles.tableColbdtwo}>
              <Text style={styles.textsig}>
                ลงชื่อ(Signature) {document.student.name_std}{" "}
                {document.student.surname_std} นักศึกษา(Student)
              </Text>

              <Text style={styles.textsigtwo}>
                ( {document.student.signature_std} )
              </Text>

              <Text style={styles.textsigthree}>
                {convertToThaiYear(moment(new Date()).format("L"))}
              </Text>
            </View>
          </View>
        </View>

        {/* <Text style={styles.textsig}>
          ลงชื่อ(Signature) {document.student.name_std}{" "}
          {document.student.surname_std} นักศึกษา(Student)
        </Text>

        <Text style={styles.textsigtwo}>
          ( {document.student.signature_std} )
        </Text>

        <Text style={styles.textsigthree}>
          {convertToThaiYear(moment(new Date()).format("L"))}
        </Text> */}

        {/* <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Product</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Type</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Period</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Price</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>React-PDF</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>3 User </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>5€</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>React-PDF</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>3 User </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>5€</Text>
            </View>
          </View>
          
        </View> */}

        <View style={styles.bodybdsig}>
          <View style={styles.tableRowsig}>
            <View style={styles.tableColsig}>
              {/* <View style={styles.bodybd}> */}
              <Text style={styles.textsigad}>
                {" "}
                1.ความคิดเห็นอาจารย์ที่ปรึกษา:Advisor's Comments
              </Text>

              <Text style={styles.textsigadtwo}>
                {" "}
                {document.type_one.signature.advisor_comment}
              </Text>

              <View style={styles.textCenter}>
                <Text style={styles.textsigadtwo}> ลงชื่อ (Signature):</Text>
                <Image
                  style={styles.image}
                  src={`${endpointUrl}upload/signature/${document.type_one.signature.advisor_path_sig}`}
                />
              </View>

              <Text style={styles.textsigadthree}>
                {convertToThaiYear(moment(new Date()).format("L"))}
              </Text>
            </View>

            <View style={styles.tableColsig}>
              <Text style={styles.textsigad}>
                {" "}
                6.ความเห็นหัวหน้างานบริการการศึกษา:Head of Educational Service
                Section
              </Text>

              <Text style={styles.textsigadtwo}>
                -..............................................................................................................
              </Text>

              <View style={styles.textCenter}>
                <Text style={styles.textsigadtwo}> ลงชื่อ (Signature):</Text>
                <Image
                  style={styles.image}
                  src={document.type_one.signature.advisor_path_sig}
                />
              </View>

              <Text style={styles.textsigadthree}>....../....../......</Text>
            </View>
          </View>

          <View style={styles.tableRowsig}>
            <View style={styles.tableColsig}>
              {/* <View style={styles.bodybd}> */}
              <Text style={styles.textsigad}>
                {" "}
                2.ความคิดเห็นหัวหน้าสาขาวิชา:Head of Department's Comments
              </Text>

              <Text style={styles.textsigadtwo}>
                {" "}
                {document.type_one.signature.mastersubject_comment}
              </Text>

              <View style={styles.textCenter}>
                <Text style={styles.textsigadtwo}> ลงชื่อ (Signature):</Text>
                <Image
                  style={styles.image}
                  src={`${endpointUrl}upload/signature/${document.type_one.signature.mastersubject_path_sig}`}
                />
              </View>

              <Text style={styles.textsigadthree}>
                {convertToThaiYear(moment(new Date()).format("L"))}
              </Text>
            </View>

            <View style={styles.tableColsigre}>
              <Text style={styles.textsigad}>
                {" "}
                7. ผลการพิจารณาของรองอธิการบดีประจำวิทยาเขตขอนแก่น:Vice
                President's Consideration Section
              </Text>

              <Text style={styles.textsigadfour}>
                -..............................................................................................................
              </Text>
              <Text style={styles.textsigadfour}>
                เนื่องจาก/because..................................................................................
              </Text>

              <Text style={styles.textsigadthree}></Text>
            </View>
          </View>

          <View style={styles.tableRowsig}>
            <View style={styles.tableColsig}>
              {/* <View style={styles.bodybd}> */}
              <Text style={styles.textsigad}>
                {" "}
                3. ความเห็นหัวหน้างานบริการการศึกษา/หัวหน้าสำงานนักงานคณบดี:Head
                of Educational Service Section/Head of the Dean's Office
              </Text>

              <Text style={styles.textsigadtwo}>
                {" "}
                {document.type_one.signature.head_service_or_deanoffice_comment}
              </Text>

              <View style={styles.textCenter}>
                <Text style={styles.textsigadtwo}> ลงชื่อ (Signature):</Text>
                <Image
                  style={styles.image}
                  src={`${endpointUrl}upload/signature/${document.type_one.signature.head_service_or_deanoffice_path_sig}`}
                />
              </View>

              <Text style={styles.textsigadthree}>
                {convertToThaiYear(moment(new Date()).format("L"))}
              </Text>
            </View>

            <View style={styles.tableColsigre}>
              {/* <View style={styles.bodybd}> */}

              <View style={styles.textCenter}>
                <Text style={styles.textsigadtwo}> ลงชื่อ (Signature):</Text>
                <Image
                  style={styles.image}
                  src={document.type_one.signature.advisor_path_sig}
                />
              </View>

              <Text style={styles.textsigadthree}>....../....../......</Text>
            </View>

            <Text style={styles.textsigadthree}>
              {convertToThaiYear(moment(new Date()).format("L"))}
            </Text>
          </View>

          <View style={styles.tableRowsig}>
            <View style={styles.tableColsig}>
              {/* <View style={styles.bodybd}> */}
              <Text style={styles.textsigad}>
                {" "}
                4. ความเห็นคณบดีฝ่ายวิชาการและวิจัย:Deputy Dean for Academic and
                Research
              </Text>

              <Text style={styles.textsigadtwo}>
                {" "}
                {document.type_one.signature.deputy_dean_research_comment}
              </Text>

              <View style={styles.textCenter}>
                <Text style={styles.textsigadtwo}> ลงชื่อ (Signature):</Text>
                <Image
                  style={styles.image}
                  src={`${endpointUrl}upload/signature/${document.type_one.signature.deputy_dean_research_path_sig}`}
                />
              </View>

              <Text style={styles.textsigadthree}>
                {convertToThaiYear(moment(new Date()).format("L"))}
              </Text>
            </View>

            <View style={styles.tableColsig}>
              <Text style={styles.textsigad}>
                {" "}
                8.ความเห็นหัวหน้าแผนกส่งเสริมวิชาการและงานทะเบียน: Head of
                Academic Promotion And Registration sextion
              </Text>

              <Text style={styles.textsigadtwo}>
                -..............................................................................................................
              </Text>

              <View style={styles.textCenter}>
                <Text style={styles.textsigadtwo}> ลงชื่อ (Signature):</Text>
                <Image
                  style={styles.image}
                  src={document.type_one.signature.advisor_path_sig}
                />
              </View>

              <Text style={styles.textsigadthree}>....../....../......</Text>
            </View>
          </View>

          <View style={styles.tableRowsig}>
            <View style={styles.tableColsig}>
              {/* <View style={styles.bodybd}> */}
              <Text style={styles.textsigad}>
                {" "}
                4. ความเห็นคณบดี:Dean's Consideration Research
              </Text>

              <Text style={styles.textsigadtwo}>
                {" "}
                {document.type_one.signature.dean_comment}
              </Text>

              <View style={styles.textCenter}>
                <Text style={styles.textsigadtwo}> ลงชื่อ (Signature):</Text>
                <Image
                  style={styles.image}
                  src={`${endpointUrl}upload/signature/${document.type_one.signature.dean_path_sig}`}
                />
              </View>

              <Text style={styles.textsigadthree}>
                {convertToThaiYear(moment(new Date()).format("L"))}
              </Text>
            </View>

            <View style={styles.tableColsig}>
              <Text style={styles.textsigad}>
                {" "}
                9.เจ้าหน้าที่ทะเบียน: Registrar Officer
              </Text>

              <Text style={styles.textsigadtwo}>
                -..............................................................................................................
              </Text>

              <Text style={styles.textsigadfour}>
                เพราะ/because..................................................................................
              </Text>

              <View style={styles.textCenter}>
                <Text style={styles.textsigadtwo}> ลงชื่อ (Signature):</Text>
                <Image
                  style={styles.image}
                  src={document.type_one.signature.advisor_path_sig}
                />
              </View>

              <Text style={styles.textsigadthree}>....../....../......</Text>
            </View>
          </View>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

const DownloadDocumentOnePDF = ({ document }) => {
  return (
    <div>
      <PDFDownloadLink
        document={<DocumentOnePDF document={document} />}
        fileName="ใบคำร้องทั่วไป.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : <Button>ดาวน์โหลดแบบคำร้อง</Button>
        }
      </PDFDownloadLink>
      {/* <PDFViewer style={{ width: "100%", minHeight: "100vh" }}>
        <DocumentOnePDF document={document} />
      </PDFViewer> */}
    </div>
  );
};

export default DownloadDocumentOnePDF;
