"use client";

import { Alert, Button, Form, Input } from "antd";
import { signIn } from "next-auth/react";
import { useState } from "react";

type LoginFieldType = {
  username?: string;
  password?: string;
};

export default function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async ({ username, password }: LoginFieldType) => {
    setLoading(true);
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (!res?.ok) {
      setError("Usuario y/o contraseña incorrecto.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full mx-4 md:w-1/2 rounded-md bg-slate-50 h-full p-6 self-center flex flex-col gap-4 shadow-lg">
      <img src="/logo-telefactor.png" className="object-scale-down max-h-14" />
      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item<LoginFieldType>
          label="Usuario"
          name="username"
          validateStatus={error && "error"}
        >
          <Input disabled={loading} />
        </Form.Item>
        <Form.Item<LoginFieldType>
          label="Contraseña"
          name="password"
          validateStatus={error && "error"}
        >
          <Input type="password" disabled={loading} />
        </Form.Item>
        {error && (
          <div className="mb-4">
            <Alert message={error} type="error" showIcon />
          </div>
        )}
        <Button loading={loading} type="primary" htmlType="submit">
          Ingresar
        </Button>
      </Form>
    </div>
  );
}
