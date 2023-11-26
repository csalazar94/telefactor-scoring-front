import configuration from "@/config";

export const createRateSimulation = async ({
  token,
  data,
}: {
  token: string;
  data: { rut: string; amount: string; paymentTermDays: number };
}) => {
  const response = await fetch(
    `${configuration.backend}/api/v1/rate-calculator/simulate`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rut: data.rut,
        amount: Number(data.amount),
        paymentTermDays: Number(data.paymentTermDays),
      }),
    },
  );
  const responseData = await response.json();
  if (!response.ok) throw new Error("Error creating job");
  return responseData;
};
