import React from "react";
import { useDispatch, useSelector } from "react-redux";

import BaseLayout from "../../components/layout/BaseLayout";
import BaseLayoutAuthority from "../../components/layout/layout-authority/BaseLayoutAuthority";
import { authorityLoginAction } from "../../redux/actions/AuthAction";

export default function Authority() {
  const dispatch = useDispatch();
  const { profile, isAuthentication } = useSelector((state) => state.authState);

  return (
    <BaseLayoutAuthority activeMenu="/">
      <div className="text-center ">
        <img src="/authoritybk.png" style={{ width: 1111, height: 678 }} />
      </div>
    </BaseLayoutAuthority>
  );
}
