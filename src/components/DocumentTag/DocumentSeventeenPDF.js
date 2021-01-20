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

const DocumentSeventeenPDF = ({ document }) => {
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

    textheadre: {
      textIndent: 5,
      margin: 3,
      fontSize: 6,
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

const DownloadDocumentSeventeenPDF = ({ document }) => {
  return (
    <div>
      <PDFDownloadLink
        document={<DocumentSeventeenPDF document={document} />}
        fileName="ใบคำร้องขอแก้ไขหมวดวิชาตามโครงสร้างหลักสูตร.pdf"
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

export default DownloadDocumentSeventeenPDF;
