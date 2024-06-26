import configuration from "@/config";
import type { Color } from "antd/es/color-picker";

export const getScoreCategories = async ({ token }: { token: string }) => {
  const response = await fetch(
    `${configuration.backend}/api/v1/report-builder/score-categories`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) throw new Error("Error obtaining score categories");
  return response.json();
};

export const updateScoreCategory = async ({
  token,
  id,
  data,
}: {
  token: string;
  id: string;
  data: {
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
  };
}) => {
  const response = await fetch(
    `${configuration.backend}/api/v1/report-builder/score-categories/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  if (!response.ok) throw new Error("Error updating score category");
  return response.json();
};

export const getScoreBDs = async ({ token }: { token: string }) => {
  const response = await fetch(
    `${configuration.backend}/api/v1/report-builder/score-bds`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok)
    throw new Error("Error obtaining score banked and defaulter");
  return response.json();
};

export const updateScoreBD = async ({
  token,
  id,
  data,
}: {
  token: string;
  id: string;
  data: {
    salesSegment: string;
    score: number;
  };
}) => {
  const response = await fetch(
    `${configuration.backend}/api/v1/report-builder/score-bds/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  if (!response.ok)
    throw new Error("Error updating score banked and defaulter");
  return response.json();
};

export const getScoreBNDD3Ms = async ({ token }: { token: string }) => {
  const response = await fetch(
    `${configuration.backend}/api/v1/report-builder/score-bndd3ms`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok)
    throw new Error(
      "Error obtaining score banked not defaulting now but defaulting last 3 months",
    );
  return response.json();
};

export const updateScoreBNDD3M = async ({
  token,
  id,
  data,
}: {
  token: string;
  id: string;
  data: {
    salesSegment: string;
    score: number;
  };
}) => {
  const response = await fetch(
    `${configuration.backend}/api/v1/report-builder/score-bndd3ms/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  if (!response.ok)
    throw new Error(
      "Error updating score banked not defaulting now but defaulting last 3 months",
    );
  return response.json();
};

export const getScoreBNDNDND3Ms = async ({ token }: { token: string }) => {
  const response = await fetch(
    `${configuration.backend}/api/v1/report-builder/score-bndndnd3ms`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok)
    throw new Error(
      "Error obtaining score banked not defaulting now and not defaulting last 3 months",
    );
  return response.json();
};

export const updateScoreBNDNDND3M = async ({
  token,
  id,
  data,
}: {
  token: string;
  id: string;
  data: {
    salesSegment: string;
    score: number;
  };
}) => {
  const response = await fetch(
    `${configuration.backend}/api/v1/report-builder/score-bndndnd3ms/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  if (!response.ok)
    throw new Error(
      "Error updating score banked not defaulting now and not defaulting last 3 months",
    );
  return response.json();
};

export const getScoreUs = async ({ token }: { token: string }) => {
  const response = await fetch(
    `${configuration.backend}/api/v1/report-builder/score-us`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) throw new Error("Error obtaining score unbanked");
  return response.json();
};

export const updateScoreU = async ({
  token,
  id,
  data,
}: {
  token: string;
  id: string;
  data: {
    salesSegment: string;
    score: number;
  };
}) => {
  const response = await fetch(
    `${configuration.backend}/api/v1/report-builder/score-us/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  if (!response.ok) throw new Error("Error updating score unbanked");
  return response.json();
};

export const getScoreBWDNDND3Ms = async ({ token }: { token: string }) => {
  const response = await fetch(
    `${configuration.backend}/api/v1/report-builder/score-bwdndnd3ms`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok)
    throw new Error(
      "Error obtaining score banked with debt, without defaulting now neither last 3 months",
    );
  return response.json();
};

export const updateScoreBWDNDND3M = async ({
  token,
  id,
  data,
}: {
  token: string;
  id: string;
  data: {
    salesSegment: string;
    minLeverage: number;
    maxLeverage: number;
    score: number;
  };
}) => {
  const response = await fetch(
    `${configuration.backend}/api/v1/report-builder/score-bwdndnd3ms/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  if (!response.ok)
    throw new Error(
      "Error updating score banked with debt, not defaulting now neither last 3 months",
    );
  return response.json();
};

export const getRateSimulationScores = async ({
  token,
  page,
  size,
  rut,
}: {
  token: string;
  page: number;
  size: number;
  rut: string | undefined;
}) => {
  const queryParams = new URLSearchParams({
    page: String(page),
    size: String(size),
    ...(rut ? { rut } : {}),
  });
  const response = await fetch(
    `${configuration.backend}/api/v1/rate-calculator/scores?${queryParams}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  const responseData = await response.json();
  if (!response.ok) throw new Error("Error getting scores");
  return responseData;
};

export const putRateSimulationScores = async ({
  token,
  data,
}: {
  token: string;
  data: any;
}) => {
  const response = await fetch(
    `${configuration.backend}/api/v1/rate-calculator/scores`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    },
  );
  const responseData = await response.json();
  if (!response.ok) {
    if (responseData.message) {
      throw new Error(responseData.message);
    }
    throw new Error("Error putting scores");
  }
  return responseData;
};

export const getSalesAmounts = async ({ token }: { token: string }) => {
  const response = await fetch(
    `${configuration.backend}/api/v1/report-builder/sales-amounts`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  const responseData = await response.json();
  if (!response.ok) throw new Error("Error getting sales amounts");
  return responseData;
};

export const updateSalesAmount = async ({
  token,
  id,
  data,
}: {
  token: string;
  id: string;
  data: any;
}) => {
  const response = await fetch(
    `${configuration.backend}/api/v1/report-builder/sales-amounts/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  const responseData = await response.json();
  if (!response.ok) {
    if (responseData.message) {
      throw new Error(responseData.message);
    }
    throw new Error("Error updating sales amount");
  }
  return responseData;
};
