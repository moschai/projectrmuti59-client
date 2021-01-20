import { useParams } from "react-router-dom";
import React from "react";
import ApprovedDocSubjectTen from "../../components/authority/approved/ApprovedDocSubjectTen";
import BaseLayoutAuthority from "../../components/layout/layout-authority/BaseLayoutAuthority";

const ApproveDocSubjectTenPage = () => {
  const { tableId } = useParams();

  return (
    <BaseLayoutAuthority activeMenu="docauthsubjectten">
      <ApprovedDocSubjectTen tableId={tableId} />
    </BaseLayoutAuthority>
  );
};

export default ApproveDocSubjectTenPage;
