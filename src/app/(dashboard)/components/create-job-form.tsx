"use client";

import { createJob } from "@/services/factoring-risk-report-jobs";
import { Button, Form, Input } from "antd";
import { useSession } from "next-auth/react";
import { useState } from "react";

type FieldType = {
  rut: string;
  amount: string;
};

export default function CreateJobForm({
  refreshJobs,
}: {
  refreshJobs: Function;
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { data } = useSession({
    required: true,
  });

  const access_token = data!.access_token;

  const handleCreateJob = async ({ rut, amount }: FieldType) => {
    setLoading(true);
    try {
      await createJob({ token: access_token, job: { rut, amount } });
      await refreshJobs();
      form.resetFields();
    } catch (error) {
      console.error(error);
      // TODO: add error notification
    }
    setLoading(false);
  };

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={handleCreateJob}
      initialValues={{ rut: "", amount: "" }}
    >
      <Form.Item<FieldType> label="Rut" name="rut" required>
        <Input disabled={loading} />
      </Form.Item>
      <Form.Item<FieldType> label="Monto" name="amount" required>
        <Input disabled={loading} />
      </Form.Item>
      <Button loading={loading} type="primary" htmlType="submit">
        Generar
      </Button>
    </Form>
  );
}
