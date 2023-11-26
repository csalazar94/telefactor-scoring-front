"use client";

import { createRateSimulation } from "@/services/rate-simulation";
import { Button, Form, Input, InputNumber, notification } from "antd";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

type FieldType = {
  rut: string;
  amount: string;
  paymentTermDays: number;
};

export default function CreateRateSimulator({
  setRateSimulation,
}: {
  setRateSimulation: Function;
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { data } = useSession({
    required: true,
  });
  const [api, contextHolder] = notification.useNotification();
  const isLessThanXl = useMediaQuery({ query: "(max-width: 1200px)" });

  const access_token = data!.access_token;

  const handleCreateSimulation = async ({
    rut,
    amount,
    paymentTermDays,
  }: FieldType) => {
    setLoading(true);
    try {
      const rateResponse = await createRateSimulation({
        token: access_token,
        data: { rut: rut?.toUpperCase(), amount, paymentTermDays },
      });
      setRateSimulation(rateResponse);
      api.success({
        message: "Simulación exitosa",
        description: "Se creó exitosamente la simulación",
        placement: "topRight",
      });
    } catch (error) {
      api.error({
        message: "Error",
        description: "Ocurrió un error al crear la simulación",
        placement: "topRight",
      });
    }
    setLoading(false);
  };
  return (
    <Form
      form={form}
      layout={isLessThanXl ? "vertical" : "inline"}
      onFinish={handleCreateSimulation}
      initialValues={{ rut: "", amount: "", paymentTermDays: "" }}
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
      <Form.Item<FieldType>
        label="Plazo en días"
        name="paymentTermDays"
        rules={[
          { required: true, message: "El plazo en días es obligatorio" },
          {
            min: 29,
            type: "number",
            message: "El plazo en días debe ser mayor a 29",
          },
        ]}
      >
        <InputNumber
          style={{ width: "100%" }}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          }
          parser={(value) => value!.replace(/(\.*)/g, "")}
          disabled={loading}
        />
      </Form.Item>
      <Button loading={loading} type="primary" htmlType="submit">
        Simular
      </Button>
    </Form>
  );
}
