import React from "react";
import { useParams, useLocation } from "react-router-dom";
import ApprovedDocOne from "../../components/authority/approved/ApprovedDocumentOne";
import BaseLayoutAuthority from "../../components/layout/layout-authority/BaseLayoutAuthority";
import ApprovedDocTwo from "../../components/authority/approved/ApprovedDocumentTwo";
import ApprovedDocThree from "../../components/authority/approved/ApprovedDocumentThree";
import ApprovedDocFour from "../../components/authority/approved/ApprovedDocumentFour";
import ApprovedDocFive from "../../components/authority/approved/ApprovedDocumentFive";
import ApprovedDocSix from "../../components/authority/approved/ApprovedDocumentSix";
import ApprovedDocSeven from "../../components/authority/approved/ApprovedDocumentSeven";
import ApprovedDocEight from "../../components/authority/approved/ApprovedDocumentEight";
import ApprovedDocNine from "../../components/authority/approved/ApprovedDocumentNine";
import ApprovedDocTen from "../../components/authority/approved/ApprovedDocumentTen";
import ApprovedDocEleven from "../../components/authority/approved/ApprovedDocumentEleven";
import ApprovedDocTwelve from "../../components/authority/approved/ApprovedDocumentTwelve";
import ApprovedDocThirteen from "../../components/authority/approved/ApprovedDocumentThirteen";
import ApprovedDocFourteen from "../../components/authority/approved/ApprovedDocumentFourteen";
import ApprovedDocFifteen from "../../components/authority/approved/ApprovedDocumentFifteen";
import ApprovedDocSixteen from "../../components/authority/approved/ApprovedDocumentSixteen";
import ApprovedDocSeventeen from "../../components/authority/approved/ApprovedDocumentSeventeen";

const ApproveDocumentPage = () => {
  const { document } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const type = Number(query.get("type"));

  const renderDocument = () => {
    if (type === 1) {
      return <ApprovedDocOne documentId={document} />;
    } else if (type === 2) {
      return <ApprovedDocTwo documentId={document} />;
    } else if (type === 3) {
      return <ApprovedDocThree documentId={document} />;
    } else if (type === 4) {
      return <ApprovedDocFour documentId={document} />;
    } else if (type === 5) {
      return <ApprovedDocFive documentId={document} />;
    } else if (type === 6) {
      return <ApprovedDocSix documentId={document} />;
    } else if (type === 7) {
      return <ApprovedDocSeven documentId={document} />;
    } else if (type === 8) {
      return <ApprovedDocEight documentId={document} />;
    } else if (type === 9) {
      return <ApprovedDocNine documentId={document} />;
    } else if (type === 10) {
      return <ApprovedDocTen documentId={document} />;
    } else if (type === 11) {
      return <ApprovedDocEleven documentId={document} />;
    } else if (type === 12) {
      return <ApprovedDocTwelve documentId={document} />;
    } else if (type === 13) {
      return <ApprovedDocThirteen documentId={document} />;
    } else if (type === 14) {
      return <ApprovedDocFourteen documentId={document} />;
    } else if (type === 15) {
      return <ApprovedDocFifteen documentId={document} />;
    } else if (type === 16) {
      return <ApprovedDocSixteen documentId={document} />;
    } else if (type === 17) {
      return <ApprovedDocSeventeen documentId={document} />;
    }
    return <div>page</div>;
  };

  return (
    <BaseLayoutAuthority activeMenu="document">
      {renderDocument()}
    </BaseLayoutAuthority>
  );
};

export default ApproveDocumentPage;
