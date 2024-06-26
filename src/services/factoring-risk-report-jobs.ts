import configuration from "@/config";

export const getJobs = async (token: string, page: number, size: number) => {
  const queryParams = new URLSearchParams({
    page: String(page),
    size: String(size),
  });
  const response = await fetch(
    `${configuration.backend}/api/v1/report-builder/factoring-risk-report-jobs?${queryParams}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) throw new Error("Error obtaining jobs");
  return response.json();
};

export const getJob = async ({
  token,
  jobId,
}: {
  token: string;
  jobId: string;
}) => {
  const response = await fetch(
    `${configuration.backend}/api/v1/report-builder/factoring-risk-report-jobs/${jobId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) throw new Error("Error obtaining job");
  return response.json();
};

export const createJob = async ({
  token,
  job,
}: {
  token: string;
  job: { rut: string; amount: string };
}) => {
  const response = await fetch(
    `${configuration.backend}/api/v1/report-builder/factoring-risk-report-jobs`,
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
};
