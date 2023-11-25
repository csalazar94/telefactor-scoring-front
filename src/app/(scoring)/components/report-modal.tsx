"use client";

import { getJob } from "@/services/factoring-risk-report-jobs";
import { LoadingOutlined } from "@ant-design/icons";
import { Modal, notification } from "antd";
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
  const [error, setError] = useState(false);
  const [job, setJob] = useState<Job>();
  const { data, status } = useSession({
    required: true,
  });
  const [api, contextHolder] = notification.useNotification();

  const access_token = data!.access_token;

  useEffect(() => {
    setLoading(true);
    getJob({ token: access_token, jobId })
      .then((job) => {
        setJob(job);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
        api.error({
          message: "Error",
          description: "Ocurrió un error al obtener el reporte",
        });
      });
  }, [access_token, jobId, api]);

  if (loading || status === "loading") {
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

  if (error) {
    return <>{contextHolder}</>;
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
