import ApprovedDocSubjectEight from "../../components/authority/approved/ApprovedDocSubjectEight";
import { useParams } from "react-router-dom";
import React from "react";
import BaseLayoutAuthority from "../../components/layout/layout-authority/BaseLayoutAuthority";

const ApproveDocSubjectEightPage = () => {
  const { tableId } = useParams();

  return (
    <BaseLayoutAuthority activeMenu="docauthsubjecteight">
      <ApprovedDocSubjectEight tableId={tableId} />
    </BaseLayoutAuthority>
  );
};

export default ApproveDocSubjectEightPage;
