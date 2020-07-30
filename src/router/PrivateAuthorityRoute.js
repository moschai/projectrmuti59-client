import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { appPath } from "./path";

const PrivateAuthorityRoute = ({ component: Component, ...rest }) => {
  const { isAuthentication } = useSelector((state) => state.authState);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthentication ? (
          // eslint-disable-next-line react/react-in-jsx-scope
          <Component {...props} />
        ) : (
          // eslint-disable-next-line react/react-in-jsx-scope
          <Redirect to={`${appPath.authority.root}${appPath.login}`} />
        )
      }
    />
  );
};
export default PrivateAuthorityRoute;
