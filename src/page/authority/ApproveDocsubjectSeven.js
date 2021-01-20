import ApprovedDocSubjectSeven from "../../components/authority/approved/ApprovedDocSubjectSeven";
import { useParams } from "react-router-dom";
import React from "react";
import BaseLayoutAuthority from "../../components/layout/layout-authority/BaseLayoutAuthority";

const ApproveDocSubjectSevenPage = () => {
  const { tableId } = useParams();

  return (
    <BaseLayoutAuthority activeMenu="docauthsubjectseven">
      {" "}
      <ApprovedDocSubjectSeven tableId={tableId} />
    </BaseLayoutAuthority>
  );
};

export default ApproveDocSubjectSevenPage;
