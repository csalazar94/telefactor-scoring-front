"use client";

import {
  getRateSimulationScores,
  putRateSimulationScores,
} from "@/services/settings";
import {
  Button,
  Form,
  Input,
  Pagination,
  Space,
  Table,
  Typography,
  Upload,
  message,
  notification,
} from "antd";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { RcFile } from "rc-upload/lib/interface";
import type { FilterDropdownProps } from "antd/es/table/interface";
import type { TableColumnType } from "antd";

const { Title } = Typography;

interface RateSimulationScore {
  id: string;
  rut: string;
  score: number;
}

export default function RateSimulationScoresSettings() {
  const [form] = Form.useForm();
  const [rateSimulationScores, setRateSimulationScores] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    total: 0,
  });
  const [rut, setRut] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const { data } = useSession({
    required: true,
  });
  const [api, contextHolder] = notification.useNotification();

  const access_token = data!.access_token;

  const refreshRateSimulationScores = useCallback(
    async (page: number, size: number) => {
      setLoading(true);
      try {
        const rateSimulationScores = await getRateSimulationScores({
          token: access_token,
          page,
          size,
          rut,
        });
        setRateSimulationScores(
          rateSimulationScores.data.map((s: RateSimulationScore) => ({
            key: s.rut,
            rut: s.rut,
            score: String(s.score),
          })),
        );
        setPagination({
          page: rateSimulationScores.page,
          size: rateSimulationScores.size,
          total: rateSimulationScores.total,
        });
      } catch (error) {
        api.error({
          message: "Error",
          description: "Ocurrió un error al obtener los puntajes",
        });
      }
      setLoading(false);
    },
    [api, access_token, rut],
  );

  const handleSearch = (selectedKeys: React.Key[], confirm: Function) => {
    setRut(selectedKeys[0] as string);
    setPagination({ ...pagination, page: 1 });
    confirm();
  };

  const handleReset = (
    clearFilters: () => void,
    close: FilterDropdownProps["close"],
    confirm: FilterDropdownProps["confirm"],
  ) => {
    clearFilters();
    setRut("");
    setPagination({ ...pagination, page: 1 });
    confirm();
    close();
  };

  const columns: TableColumnType<RateSimulationScore>[] = [
    {
      title: "Rut",
      dataIndex: "rut",
      width: 200,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
      }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            placeholder="Buscar rut"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Buscar
            </Button>
            <Button
              onClick={() =>
                clearFilters && handleReset(clearFilters, close, confirm)
              }
              size="small"
              style={{ width: 90 }}
            >
              Limpiar
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
    },
    {
      title: "Score",
      dataIndex: "score",
      width: 200,
    },
  ];

  useEffect(() => {
    refreshRateSimulationScores(pagination.page, pagination.size);
    return setRateSimulationScores([]);
  }, [refreshRateSimulationScores, pagination.page, pagination.size]);

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("file", file);
    });
    setUploading(true);
    try {
      await putRateSimulationScores({ token: access_token, data: formData });
      message.success("Archivo subido correctamente.");
      await refreshRateSimulationScores(pagination.page, pagination.size);
    } catch (error: any) {
      if (error?.message === "Error putting scores") {
        message.error("Ocurrió un error al subir el archivo");
      } else {
        message.error(error?.message);
      }
    } finally {
      setFileList([]);
      setUploading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Title level={2} className="my-0">
        Puntajes para simulaciones de tasas
      </Title>
      <Upload
        fileList={fileList}
        name="file"
        accept=".xlsx"
        maxCount={1}
        beforeUpload={(file) => {
          setFileList([...fileList, file]);
        }}
        customRequest={(options) => {
          const { onSuccess, onError } = options;
          handleUpload()
            .then(() => onSuccess && onSuccess("Ok"))
            .catch((error) => onError && onError(error));
        }}
      >
        <Button loading={uploading} icon={<UploadOutlined />}>
          Subir archivo
        </Button>
      </Upload>
      <Form form={form} component={false}>
        {contextHolder}
        <Table
          loading={loading}
          dataSource={rateSimulationScores}
          columns={columns}
          scroll={{ x: "max-content" }}
          pagination={false}
        />
      </Form>
      <Pagination
        disabled={loading}
        style={{ alignSelf: "flex-end" }}
        current={pagination.page}
        pageSize={pagination.size}
        total={pagination.total}
        onChange={(page, pageSize) =>
          refreshRateSimulationScores(page, pageSize)
        }
      />
    </div>
  );
}
