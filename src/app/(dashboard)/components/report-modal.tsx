"use client";

import { getJob } from "@/services/factoring-risk-report-jobs";
import { LoadingOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useEffect, useState } from "react";

interface ReportModalProps {
  jobId: string;
  showModal: boolean;
  token: string;
  setShowModal: Function;
}

export default function ReportModal({
  jobId,
  showModal,
  token,
  setShowModal,
}: ReportModalProps) {
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState();

  useEffect(() => {
    if (!token) return;
    getJob({ token, jobId }).then((job) => {
      setJob(job);
      setLoading(false);
    });
  }, [token, jobId]);

  return (
    <Modal
      title={`Reporte: ${job?.output?.name || "Cargando..."}`}
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
      {loading ? (
        <LoadingOutlined className="text-6xl" style={{ color: "blue" }} />
      ) : (
        <embed
          src={job?.output?.pdfBase64}
          type="application/pdf"
          width="100%"
          height="100%"
        />
      )}
    </Modal>
  );
}
