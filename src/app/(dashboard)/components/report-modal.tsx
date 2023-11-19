"use client";

import { getJob } from "@/services/factoring-risk-report-jobs";
import { LoadingOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { Job } from "./jobs-table";
import { useSession } from "next-auth/react";

interface ReportModalProps {
  jobId: string;
  showModal: boolean;
  setShowModal: Function;
}

export default function ReportModal({
  jobId,
  showModal,
  setShowModal,
}: ReportModalProps) {
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<Job>();
  const { data } = useSession({
    required: true,
  });

  const access_token = data!.access_token;

  useEffect(() => {
    if (!access_token) return;
    getJob({ token: access_token, jobId }).then((job) => {
      setJob(job);
      setLoading(false);
    });
  }, [access_token, jobId]);

  if (loading) {
    return (
      <Modal
        open={showModal}
        centered={true}
        footer={false}
        onOk={() => setShowModal(!showModal)}
        onCancel={() => setShowModal(!showModal)}
        styles={{
          body: { display: "flex", justifyContent: "center" },
        }}
      >
        <LoadingOutlined style={{ color: "blue" }} className="text-8xl" />
      </Modal>
    );
  }

  return (
    <Modal
      title={`Reporte: ${job!.output?.name}`}
      open={showModal}
      onOk={() => setShowModal(!showModal)}
      onCancel={() => setShowModal(!showModal)}
      width="100%"
      styles={{
        body: { height: "80vh", display: "flex", justifyContent: "center" },
      }}
      centered={true}
      footer={false}
    >
      <embed
        src={job!.output?.pdfBase64}
        type="application/pdf"
        width="100%"
        height="100%"
      />
    </Modal>
  );
}
