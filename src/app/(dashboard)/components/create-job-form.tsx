"use client";

import { Button, Form, Input } from "antd";

type FieldType = {
  rut?: string;
  amount?: string;
};

export default function CreateJobForm() {
  return (
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
  );
}
