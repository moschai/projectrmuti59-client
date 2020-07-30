import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseLayoutAuthority from "../../components/layout/layout-authority/BaseLayoutAuthority";
import ForAuthorityTable from "../../components/authority/ForAuthorityTable";

export default function DocumentForAuthority() {
  const dispatch = useDispatch();

  return (
    <BaseLayoutAuthority activeMenu="document">
      <div>
        <br />
        <ForAuthorityTable />
      </div>
    </BaseLayoutAuthority>
  );
}
