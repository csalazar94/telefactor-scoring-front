"use client";

import { getJob, getJobs } from "@/services/factoring-risk-report-jobs";
import { Button, Flex, Form, Input, Modal, Table } from "antd";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { useState } from "react";
import { getToken } from "@/services/auth";
import { EyeOutlined } from "@ant-design/icons";

type FieldType = {
  rut?: string;
  amount?: string;
};

const queryClient = new QueryClient();

export default function Home() {
  const [token, setToken] = useState();

  return (
    <QueryClientProvider client={queryClient}>
      {token ? (
        <Flex gap="middle" vertical>
          <Form layout="inline">
            <Form.Item<FieldType> label="Rut" name="rut">
              <Input />
            </Form.Item>
            <Form.Item<FieldType> label="Monto" name="amount">
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Generar
            </Button>
          </Form>
          <JobsTable token={token} />
        </Flex>
      ) : (
        <Login setToken={setToken} />
      )}
    </QueryClientProvider>
  );
}

interface ReportModalProps {
  jobId: string;
  showModal: boolean;
  token: string;
  setShowModal: Function;
}

function ReportModal({
  jobId,
  showModal,
  token,
  setShowModal,
}: ReportModalProps) {
  const { isPending, error, data } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJob({ token, jobId }),
  });

  return (
    <Modal
      title={`Reporte: ${data?.output?.name}`}
      open={showModal}
      onOk={() => setShowModal(!showModal)}
      onCancel={() => setShowModal(!showModal)}
      width="100%"
      bodyStyle={{ height: "80vh" }}
      centered={true}
      footer={false}
    >
      <embed
        src={data?.output?.pdfBase64}
        type="application/pdf"
        width="100%"
        height="100%"
      />
    </Modal>
  );
}

interface JobsTableProps {
  token: string;
}

function JobsTable({ token }: JobsTableProps) {
  const [showModal, setShowModal] = useState(false);
  const [jobId, setJobId] = useState();

  const { isPending, error, data } = useQuery({
    queryKey: ["jobs", token],
    queryFn: () => getJobs(token),
  });

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
      render: (_, record) => (
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

  return (
    <div>
      <Table dataSource={data} columns={columns} />
      {showModal && jobId ? (
        <ReportModal
          jobId={jobId}
          showModal={showModal}
          token={token}
          setShowModal={setShowModal}
        />
      ) : null}
    </div>
  );
}

type LoginFieldType = {
  username?: string;
  password?: string;
};

interface LoginProps {
  setToken: Function;
}

function Login({ setToken }: LoginProps) {
  const mutation = useMutation({
    mutationFn: getToken,
    onSuccess: (data) => {
      setToken(data.access_token);
    },
  });

  return (
    <Form
      layout="vertical"
      onFinish={({ username, password }) =>
        mutation.mutate({ username, password })
      }
    >
      <Form.Item<LoginFieldType> label="Usuario" name="username">
        <Input />
      </Form.Item>
      <Form.Item<LoginFieldType> label="Contraseña" name="password">
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Generar
      </Button>
    </Form>
  );
}
