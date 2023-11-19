"use client";

import { getJobs } from "@/services/factoring-risk-report-jobs";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
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

export default function JobsTable() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [jobId, setJobId] = useState("");
  const [jobs, setJobs] = useState([]);
  const { data } = useSession({
    required: true,
  });

  const access_token = data!.access_token;

  const columns = [
    {
      title: "Fecha de creación",
      dataIndex: "createdAt",
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

  useEffect(() => {
    if (!access_token) return;
    getJobs(access_token).then((jobs) =>
      setJobs(jobs.map((j: Job) => ({ ...j, key: j.id }))),
    );
    setLoading(false);
  }, [access_token]);

  return (
    <div>
      <Table
        scroll={{ x: true }}
        loading={loading}
        dataSource={jobs}
        columns={columns}
      />
      {showModal && jobId ? (
        <ReportModal
          jobId={jobId}
          showModal={showModal}
          token={access_token}
          setShowModal={setShowModal}
        />
      ) : null}
    </div>
  );
}
