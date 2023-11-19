import { cache } from "react";

export const getJobs = cache(async (token: string) => {
  const response = await fetch(
    "http://localhost:3000/api/v1/report-builder/factoring-risk-report-jobs",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) throw new Error("Error obtaining jobs");
  return response.json();
});

export const getJob = cache(
  async ({ token, jobId }: { token: string; jobId: string }) => {
    const response = await fetch(
      `http://localhost:3000/api/v1/report-builder/factoring-risk-report-jobs/${jobId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) throw new Error("Error obtaining job");
    return response.json();
  },
);

export const createJob = cache(
  async ({
    token,
    job,
  }: {
    token: string;
    job: { rut: string; amount: string };
  }) => {
    const response = await fetch(
      "http://localhost:3000/api/v1/report-builder/factoring-risk-report-jobs",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rut: job.rut, amount: Number(job.amount) }),
      },
    );
    const data = await response.json();
    if (!response.ok) throw new Error("Error creating job");
    return data;
  },
);
