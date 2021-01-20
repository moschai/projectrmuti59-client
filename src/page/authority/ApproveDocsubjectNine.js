import ApprovedDocSubjectNine from "../../components/authority/approved/ApprovedDocSubjectNine";
import { useParams } from "react-router-dom";
import React from "react";
import BaseLayoutAuthority from "../../components/layout/layout-authority/BaseLayoutAuthority";

const ApproveDocSubjectNinePage = () => {
  const { tableId } = useParams();

  return (
    <BaseLayoutAuthority activeMenu="docauthsubjectnine">
      <ApprovedDocSubjectNine tableId={tableId} />
    </BaseLayoutAuthority>
  );
};

export default ApproveDocSubjectNinePage;
