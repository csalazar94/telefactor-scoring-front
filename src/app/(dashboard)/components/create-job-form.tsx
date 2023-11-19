"use client";

import { createJob } from "@/services/factoring-risk-report-jobs";
import { Button, Form, Input, InputNumber, notification } from "antd";
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
  const [api, contextHolder] = notification.useNotification();

  const access_token = data!.access_token;

  const handleCreateJob = async ({ rut, amount }: FieldType) => {
    setLoading(true);
    try {
      await createJob({
        token: access_token,
        job: { rut: rut?.toUpperCase(), amount },
      });
      await refreshJobs();
      form.resetFields();
      api.success({
        message: "Creación exitosa",
        description: "Se creó exitosamente el reporte",
        placement: "topRight",
      });
    } catch (error) {
      api.error({
        message: "Error",
        description: "Ocurrió un error al crear el reporte",
        placement: "topRight",
      });
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
      {contextHolder}
      <Form.Item<FieldType>
        label="Rut"
        name="rut"
        rules={[
          { required: true, message: "El rut es obligatorio" },
          {
            pattern: /^[0-9]+-[0-9kK]{1}$/,
            message: "El formato del rut debe ser sin puntos y con guión",
          },
          {
            validator(_, value) {
              function calculateDv(T: number) {
                let M = 0;
                let S = 1;
                for (; T; T = Math.floor(T / 10))
                  S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
                return S ? S - 1 : "K";
              }

              function validate(text: string) {
                const tmp = text.split("-");
                const dv = tmp[1];
                const rut = tmp[0];
                return calculateDv(Number(rut)) == dv?.toUpperCase();
              }

              return validate(value) || !value
                ? Promise.resolve()
                : Promise.reject(new Error("Digito verificador no válido"));
            },
          },
        ]}
      >
        <Input style={{ width: "100%" }} disabled={loading} />
      </Form.Item>
      <Form.Item<FieldType>
        label="Monto"
        name="amount"
        rules={[
          { required: true, message: "El monto es obligatorio" },
          { min: 1, type: "number", message: "El monto debe ser mayor a 0" },
        ]}
      >
        <InputNumber
          style={{ width: "100%" }}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          }
          parser={(value) => value!.replace(/(\.*)/g, "")}
          prefix="$"
          disabled={loading}
        />
      </Form.Item>
      <Button loading={loading} type="primary" htmlType="submit">
        Generar
      </Button>
    </Form>
  );
}
