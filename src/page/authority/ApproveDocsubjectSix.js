import ApprovedDocSubjectSix from "../../components/authority/approved/ApprovedDocSubjectSix";
import { useParams } from "react-router-dom";
import React from "react";
import BaseLayoutAuthority from "../../components/layout/layout-authority/BaseLayoutAuthority";

const ApproveDocSubjectSixPage = () => {
  const { tableId } = useParams();

  return (
    <BaseLayoutAuthority activeMenu="docauthsubjectsix">
      {" "}
      <ApprovedDocSubjectSix tableId={tableId} />
    </BaseLayoutAuthority>
  );
};

export default ApproveDocSubjectSixPage;
