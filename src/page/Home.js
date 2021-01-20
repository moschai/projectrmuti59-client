import React from "react";
import { Button, Form, Avatar } from "antd";
import { withRouter } from "react-router-dom";
import { appPath } from "../router/path";

const Home = ({ history }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Form
        style={{
          minWidth: 400,
          boxShadow: "0 11px 19px 0 rgba(0, 0, 0, 0.1)",
          padding: 20,
        }}
      >
        <div className="text-center mt-3 mb-3">
          <Avatar
            src="/RMUTI_KORAT.png"
            alt="logo"
            style={{ width: 100, height: 170 }}
          />
        </div>
        <br />
        {/* <div className=" d-flex align-center min-h-100 ">
          <div className="text-center w-100"> */}

        <div className="text-center">
          <Button
            block
            size="large"
            onClick={() => history.push(appPath.student)}
          >
            นักศึกษา
          </Button>
          <br />
          <br />
          {/* <Divider type="horizontal" /> */}
          <Button
            block
            size="large"
            onClick={() => history.push(appPath.authority.root)}
          >
            อาจารย์
          </Button>
          {/* </div>
        </div> */}
        </div>
      </Form>
    </div>
  );
};

export default withRouter(Home);
