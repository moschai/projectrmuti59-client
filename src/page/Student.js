import React from "react";
import { Avatar } from "antd";
import BaseLayoutStudent from "../components/layout/layout-student/BaseLayoutStudent";

export default function Student() {
  return (
    <BaseLayoutStudent>
      {/* <div className="blackground"></div> */}

      <div className="text-center ">
        <img src="/stdbk.png" style={{ width: 1111, height: 678 }} />
      </div>
    </BaseLayoutStudent>
  );
}
