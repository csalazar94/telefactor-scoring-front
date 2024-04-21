"use client";

import { getSalesAmounts, updateSalesAmount } from "@/services/settings";
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

interface SalesAmount {
  id: string;
  salesSegment: string;
  salesAmount: number;
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  record: SalesAmount;
  inputType: "text" | "number";
  children: React.ReactNode;
}

export default function SalesaAmountSettings() {
  const [form] = Form.useForm();
  const [salesAmounts, setSalesAmounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState("");
  const { data } = useSession({
    required: true,
  });
  const [api, contextHolder] = notification.useNotification();

  const access_token = data!.access_token;

  const refreshSalesAmounts = useCallback(async () => {
    setLoading(true);
    try {
      const salesAmounts = await getSalesAmounts({
        token: access_token,
      });
      setSalesAmounts(
        salesAmounts.map((s: SalesAmount) => ({
          key: s.id,
          id: s.id,
          salesSegment: s.salesSegment,
          salesAmount: String(s.salesAmount),
        })),
      );
    } catch (error) {
      api.error({
        message: "Error",
        description: "Ocurrió un error al obtener las ventas mensuales",
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

  const edit = (record: SalesAmount) => {
    form.setFieldsValue({ ...record });
    setEditingId(record.id);
  };

  const cancel = () => {
    setEditingId("");
  };

  const save = async (id: string) => {
    try {
      const row = (await form.validateFields()) as SalesAmount;
      await updateSalesAmount({ token: access_token, id, data: row });
      api.success({
        message: "Edición exitosa",
        description: "Se editó exitosamente la venta mensual",
      });
    } catch (error) {
      api.error({
        message: "Error",
        description: "Ocurrió un error al editar la venta mensual",
      });
    } finally {
      setEditingId("");
      await refreshSalesAmounts();
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
      title: "Ventas mensuales",
      dataIndex: "salesAmount",
      width: 200,
      editable: true,
      inputType: "number",
    },
    {
      title: "Acción",
      dataIndex: "action",
      width: 200,
      render: (_: any, record: SalesAmount) => {
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
      onCell: (record: SalesAmount) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        inputType: col.inputType,
        editing: record.id === editingId,
      }),
    };
  });

  useEffect(() => {
    refreshSalesAmounts();
    return setSalesAmounts([]);
  }, [refreshSalesAmounts]);

  return (
    <div>
      <Title level={2} className="my-0">
        Ventas mensuales
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
          dataSource={salesAmounts}
          columns={mergedColumns}
          scroll={{ x: "max-content" }}
        />
      </Form>
    </div>
  );
}
