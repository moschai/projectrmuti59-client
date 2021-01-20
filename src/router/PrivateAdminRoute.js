import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { appPath } from "./path";

const PrivateAdminRoute = ({ component: Component, ...rest }) => {
  const { isAuthentication } = useSelector((state) => state.authAdminState);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthentication ? (
          // eslint-disable-next-line react/react-in-jsx-scope
          <Component {...props} />
        ) : (
          // eslint-disable-next-line react/react-in-jsx-scope
          <Redirect to={`${appPath.admin.root}${appPath.login}`} />
        )
      }
    />
  );
};
export default PrivateAdminRoute;
