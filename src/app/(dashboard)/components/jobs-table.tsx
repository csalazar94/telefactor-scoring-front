"use client";

import { EyeOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useState } from "react";
import ReportModal from "./report-modal";

export type Job = {
  id: string;
  clientId: string;
  state: string;
  error: string;
  input: {
    id: string;
    rut: string;
    amount: number;
    webhook: string;
  };
  output: {
    address: string;
    amount: number;
    answer: string;
    companySize: string;
    date: Date;
    foundationYear: number;
    id: string;
    industryCategory: string;
    name: string;
    recommendation: string;
    rut: string;
    salesSegment: string;
    score: number;
    scoreCategory: string;
    workersCount: number;
    pdfBase64: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export default function JobsTable({
  jobs,
  loadingJobs,
}: {
  jobs: Job[];
  loadingJobs: boolean;
}) {
  const [showModal, setShowModal] = useState(false);
  const [jobId, setJobId] = useState("");

  const columns = [
    {
      title: "Fecha de creación",
      dataIndex: "createdAt",
      render: (text: string) =>
        new Intl.DateTimeFormat("es-CL", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(text)),
    },
    {
      title: "Rut",
      dataIndex: ["input", "rut"],
    },
    {
      title: "Razón social",
      dataIndex: ["output", "name"],
    },
    {
      title: "Monto",
      dataIndex: ["input", "amount"],
    },
    {
      title: "Puntaje",
      dataIndex: ["output", "score"],
    },
    {
      title: "Estado",
      dataIndex: "state",
    },
    {
      title: "Ver",
      key: "see",
      render: (_: any, record: Job) => (
        <Button
          disabled={record.state !== "completed"}
          onClick={() => {
            setJobId(record.id);
            setShowModal(!showModal);
          }}
          type="primary"
          shape="circle"
          icon={<EyeOutlined />}
        />
      ),
    },
  ];

  return (
    <div>
      <Table
        scroll={{ x: true }}
        loading={loadingJobs}
        dataSource={jobs}
        columns={columns}
      />
      {showModal && jobId ? (
        <ReportModal
          jobId={jobId}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      ) : null}
    </div>
  );
}
