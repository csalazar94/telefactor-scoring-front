import { Descriptions } from "antd";

export default function RateSimulation({
  rateSimulation,
}: {
  rateSimulation:
    | {
        amountFinanced: number;
        amountReceived: number;
        interestRate: number;
        paymentTermDays: number;
        retentionAmount: number;
        score: number;
        totalCost: number;
      }
    | undefined;
}) {
  const items = [
    {
      key: 1,
      label: "Monto recibido",
      children: new Intl.NumberFormat("es-CL").format(
        rateSimulation?.amountReceived || 0,
      ),
    },
    {
      key: 2,
      label: "Monto financiado",
      children: new Intl.NumberFormat("es-CL").format(
        rateSimulation?.amountFinanced || 0,
      ),
    },
    {
      key: 3,
      label: "Tasa de interés",
      children: new Intl.NumberFormat("es-CL", {
        style: "percent",
        minimumSignificantDigits: 3,
      }).format(rateSimulation?.interestRate || 0),
    },
    {
      key: 4,
      label: "Plazo en días",
      children: new Intl.NumberFormat("es-CL").format(
        rateSimulation?.paymentTermDays || 0,
      ),
    },
    {
      key: 5,
      label: "Monto retención",
      children: new Intl.NumberFormat("es-CL").format(
        rateSimulation?.retentionAmount || 0,
      ),
    },
    {
      key: 6,
      label: "Costo total",
      children: new Intl.NumberFormat("es-CL").format(
        rateSimulation?.totalCost || 0,
      ),
    },
    {
      key: 7,
      label: "Puntaje",
      children: new Intl.NumberFormat("es-CL").format(
        rateSimulation?.score || 0,
      ),
    },
  ];
  return <Descriptions title="Simulación" items={items} />;
}
