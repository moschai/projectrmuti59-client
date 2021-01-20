import { useState } from "react";
import React from "react";
import { DeleteOutlined } from "@ant-design/icons";

const { Popconfirm, Button } = require("antd");

const DeleteDocumentButton = ({ document, confirm }) => {
  const [isVisible, setVisible] = useState(false);

  return (
    <Popconfirm
      visible={isVisible}
      title="ยืนยันการลบแบบคำร้อง"
      okButtonProps={{
        type: "primary",
        danger: true,
      }}
      onConfirm={() => {
        setVisible(false);
        confirm(document.id);
      }}
      onCancel={() => setVisible(false)}
      okText="Yes"
      cancelText="No"
    >
      <Button
        type="primary"
        danger
        shape="circle"
        onClick={() => {
          setVisible(true);
        }}
      >
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
};

export default DeleteDocumentButton;
