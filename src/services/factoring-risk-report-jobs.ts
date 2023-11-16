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
  if (!response.ok) throw new Error();
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
    if (!response.ok) throw new Error();
    return response.json();
  },
);
