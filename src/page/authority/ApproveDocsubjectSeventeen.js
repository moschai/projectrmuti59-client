import ApprovedDocSubjectSeven from "../../components/authority/approved/ApprovedDocSubjectSix";
import { useParams } from "react-router-dom";
import React from "react";
import ApprovedDocSubjectSeventeen from "../../components/authority/approved/ApprovedDocSubjectSeventeen";

const ApproveDocSubjectSeventeenPage = () => {
  const { tableId } = useParams();

  return <ApprovedDocSubjectSeventeen tableId={tableId} />;
};

export default ApproveDocSubjectSeventeenPage;
