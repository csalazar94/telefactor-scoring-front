"use client";

import { getScoreCategories, updateScoreCategory } from "@/services/settings";
import {
  ColorPicker,
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

interface ScoreCategory {
  id: string;
  category: string;
  minScore: number;
  maxScore: number;
  capacity: string;
  behavior: string;
  liquidity: string;
  leverage: string;
  judgement: string;
  maxAmountFactor: number;
  interestRate: number;
  financedPercentage: number;
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  record: ScoreCategory;
  inputType: "text" | "number";
  children: React.ReactNode;
}

export default function ScoreCategorySettings() {
  const [form] = Form.useForm();
  const [scoreCategories, setScoreCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState("");
  const { data } = useSession({
    required: true,
  });
  const [api, contextHolder] = notification.useNotification();

  const access_token = data!.access_token;

  const refreshScoreCategories = useCallback(async () => {
    setLoading(true);
    try {
      const scoreCategories = await getScoreCategories({
        token: access_token,
      });
      setScoreCategories(
        scoreCategories.map((sc: ScoreCategory) => ({
          key: sc.id,
          id: sc.id,
          category: sc.category,
          minScore: String(sc.minScore),
          maxScore: String(sc.maxScore),
          capacity: sc.capacity,
          behavior: sc.behavior,
          liquidity: sc.liquidity,
          leverage: sc.leverage,
          judgement: sc.judgement,
          maxAmountFactor: String(sc.maxAmountFactor),
          interestRate: String(sc.interestRate),
          financedPercentage: String(sc.financedPercentage),
        })),
      );
    } catch (error) {
      api.error({
        message: "Error",
        description: "Ocurrió un error al obtener las categorías de puntaje",
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

  const edit = (record: ScoreCategory) => {
    form.setFieldsValue({ ...record });
    setEditingId(record.id);
  };

  const cancel = () => {
    setEditingId("");
  };

  const save = async (id: string) => {
    try {
      const row = (await form.validateFields()) as ScoreCategory;
      await updateScoreCategory({ token: access_token, id, data: row });
      api.success({
        message: "Edición exitosa",
        description: "Se editó exitosamente la categoría de puntaje",
      });
    } catch (error) {
      api.error({
        message: "Error",
        description: "Ocurrió un error al editar la categoría de puntaje",
      });
    } finally {
      setEditingId("");
      await refreshScoreCategories();
    }
  };

  const columns = [
    {
      title: "Categoría",
      dataIndex: "category",
      width: 200,
      editable: true,
      inputType: "text",
    },
    {
      title: "Desde",
      dataIndex: "minScore",
      width: 200,
      editable: true,
      inputType: "number",
    },
    {
      title: "Hasta",
      dataIndex: "maxScore",
      width: 200,
      editable: true,
      inputType: "number",
    },
    {
      title: "Capacidad",
      dataIndex: "capacity",
      width: 200,
      editable: true,
      inputType: "text",
    },
    {
      title: "Comportamiento",
      dataIndex: "behavior",
      width: 200,
      editable: true,
      inputType: "text",
    },
    {
      title: "Liquidez",
      dataIndex: "liquidity",
      width: 200,
      editable: true,
      inputType: "text",
    },
    {
      title: "Apalancamiento",
      dataIndex: "leverage",
      width: 200,
      editable: true,
      inputType: "text",
    },
    {
      title: "Opinión",
      dataIndex: "judgement",
      width: 200,
      editable: true,
      inputType: "text",
    },
    {
      title: "Factor de máxima exposición",
      dataIndex: "maxAmountFactor",
      width: 200,
      editable: true,
      inputType: "number",
    },
    {
      title: "Tasa de interés",
      dataIndex: "interestRate",
      width: 200,
      editable: true,
      inputType: "number",
    },
    {
      title: "Porcentaje financiado",
      dataIndex: "financedPercentage",
      width: 200,
      editable: true,
      inputType: "number",
    },
    {
      title: "Acción",
      dataIndex: "action",
      width: 200,
      render: (_: any, record: ScoreCategory) => {
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
      onCell: (record: ScoreCategory) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        inputType: col.inputType,
        editing: record.id === editingId,
      }),
    };
  });

  useEffect(() => {
    refreshScoreCategories();
    return setScoreCategories([]);
  }, [refreshScoreCategories]);

  return (
    <div>
      <Title level={2} className="my-0">
        Categorías de puntaje
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
          dataSource={scoreCategories}
          columns={mergedColumns}
          scroll={{ x: "max-content" }}
        />
      </Form>
    </div>
  );
}
