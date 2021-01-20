import React, { useState, useEffect } from "react";
import { Table } from "antd";

import moment from "moment";
import { Link } from "react-router-dom";
import { appPath } from "../../router/path";
import { RenderDocumentType } from "./ForAuthorityTable";
import DocumentSevenService from "../../services/DocumentSevenService";

const columns = [
  {
    title: "รหัสใบคำร้อง",
    dataIndex: "type",
    align: "center",
    render: (type) => <span>{type.document.id}</span>,
  },
  {
    title: "ประเภทใบคำร้อง",
    dataIndex: "type",
    align: "center",
    render: (type) => (
      <span>
        <RenderDocumentType type={type.document.type_document} />
      </span>
    ),
  },
  {
    title: "ชื่อ",
    dataIndex: "type",
    render: (type) => {
      return <span>{type.document.student.name_std}</span>;
    },
  },
  {
    title: "นามสกุล",
    dataIndex: "type",
    render: (type) => {
      return <span>{type.document.student.surname_std}</span>;
    },
  },
  {
    title: "เวลา",
    dataIndex: "created",
    align: "center",
    render: (date) => <span>{moment(date).format("DD/MM/YYYY HH:mm")}</span>,
  },
  {
    title: "รายละเอียด",
    dataIndex: "idtable",
    align: "center",
    render: (idtable) => (
      <Link
        to={`${appPath.authority.root}${appPath.authority.approvesubjectseven}/${idtable}`}
      >
        รายละเอียด
      </Link>
    ),
  },
];

const ForAuthTableSubjectSeven = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getDocument();
  }, []);

  const getDocument = async () => {
    try {
      const res = await DocumentSevenService.getTablesSevenForAuthority();
      setData(res);
      console.log(res);
    } catch (error) {}
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ForAuthTableSubjectSeven;
