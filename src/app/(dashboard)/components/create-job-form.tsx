"use client";

import { createJob } from "@/services/factoring-risk-report-jobs";
import { Button, Form, Input } from "antd";
import { useSession } from "next-auth/react";
import { useState } from "react";

type FieldType = {
  rut?: string;
  amount?: string;
};

export default function CreateJobForm() {
  const [loading, setLoading] = useState(false);
  const session = useSession();

  const access_token = session?.data?.access_token;

  const handleCreateJob = async ({ rut, amount }: FieldType) => {
    setLoading(true);
    try {
      await createJob({ token: access_token, job: { rut, amount } });
    } catch (error) {}
    setLoading(false);
  };

  return (
    <Form layout="inline" onFinish={handleCreateJob}>
      <Form.Item<FieldType> label="Rut" name="rut">
        <Input disabled={loading} />
      </Form.Item>
      <Form.Item<FieldType> label="Monto" name="amount">
        <Input disabled={loading} />
      </Form.Item>
      <Button loading={loading} type="primary" htmlType="submit">
        Generar
      </Button>
    </Form>
  );
}
