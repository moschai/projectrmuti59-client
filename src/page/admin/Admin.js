import React from "react";
import { useDispatch, useSelector } from "react-redux";

import BaseLayout from "../../components/layout/BaseLayout";
import { authorityLoginAction } from "../../redux/actions/AuthAction";
import BaseLayoutAdmin from "../../components/layout/layout-admin/BaseLayoutAdmin";

export default function Admin() {
  const dispatch = useDispatch();
  const { profile, isAuthentication } = useSelector(
    (state) => state.authAdminState
  );

  return <BaseLayoutAdmin activeMenu="/"></BaseLayoutAdmin>;
}
