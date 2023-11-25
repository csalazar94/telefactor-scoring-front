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
    financedAmount: number;
    color: string | Color;
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
