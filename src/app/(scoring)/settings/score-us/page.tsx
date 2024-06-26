"use client";

import { getScoreUs, updateScoreU } from "@/services/settings";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  notification,
} from "antd";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

const { Title } = Typography;

interface ScoreU {
  id: string;
  salesSegment: string;
  score: number;
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  record: ScoreU;
  inputType: "text" | "number";
  children: React.ReactNode;
}

export default function ScoreUSettings() {
  const [form] = Form.useForm();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState("");
  const { data } = useSession({
    required: true,
  });
  const [api, contextHolder] = notification.useNotification();

  const access_token = data!.access_token;

  const refreshScores = useCallback(async () => {
    setLoading(true);
    try {
      const scores = await getScoreUs({
        token: access_token,
      });
      setScores(
        scores.map((s: ScoreU) => ({
          key: s.id,
          id: s.id,
          salesSegment: s.salesSegment,
          score: String(s.score),
        })),
      );
    } catch (error) {
      api.error({
        message: "Error",
        description: "Ocurrió un error al obtener los puntajes",
      });
    }
    setLoading(false);
  }, [api, access_token]);

  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    record,
    children,
    inputType,
    ...restProps
  }) => {
    const inputForm =
      inputType === "text" ? <Input /> : <InputNumber stringMode />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `${title} es obligatorio!`,
              },
            ]}
          >
            {inputForm}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const edit = (record: ScoreU) => {
    form.setFieldsValue({ ...record });
    setEditingId(record.id);
  };

  const cancel = () => {
    setEditingId("");
  };

  const save = async (id: string) => {
    try {
      const row = (await form.validateFields()) as ScoreU;
      await updateScoreU({ token: access_token, id, data: row });
      api.success({
        message: "Edición exitosa",
        description: "Se editó exitosamente el puntaje",
      });
    } catch (error) {
      api.error({
        message: "Error",
        description: "Ocurrió un error al editar el puntaje",
      });
    } finally {
      setEditingId("");
      await refreshScores();
    }
  };

  const columns = [
    {
      title: "Tramo de ventas",
      dataIndex: "salesSegment",
      width: 200,
      editable: true,
      inputType: "text",
    },
    {
      title: "Puntaje",
      dataIndex: "score",
      width: 200,
      editable: true,
      inputType: "number",
    },
    {
      title: "Acción",
      dataIndex: "action",
      width: 200,
      render: (_: any, record: ScoreU) => {
        if (record.id === editingId) {
          return (
            <span>
              <Typography.Link
                onClick={() => save(record.id)}
                style={{ marginRight: 8 }}
              >
                Guardar
              </Typography.Link>
              <Popconfirm
                title="¿Estás seguro de que deseas cancelar?"
                cancelText="Cancelar"
                onConfirm={cancel}
              >
                <a>Cancelar</a>
              </Popconfirm>
            </span>
          );
        } else {
          return (
            <Typography.Link
              disabled={editingId !== ""}
              onClick={() => edit(record)}
            >
              Editar
            </Typography.Link>
          );
        }
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: ScoreU) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        inputType: col.inputType,
        editing: record.id === editingId,
      }),
    };
  });

  useEffect(() => {
    refreshScores();
    return setScores([]);
  }, [refreshScores]);

  return (
    <div>
      <Title level={2} className="my-0">
        Puntaje no bancarizados
      </Title>
      <Form form={form} component={false}>
        {contextHolder}
        <Table
          loading={loading}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={scores}
          columns={mergedColumns}
          scroll={{ x: "max-content" }}
        />
      </Form>
    </div>
  );
}
