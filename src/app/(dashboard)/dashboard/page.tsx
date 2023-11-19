"use client";

import { useSession } from "next-auth/react";
import CreateJobForm from "../components/create-job-form";
import JobsTable, { Job } from "../components/jobs-table";
import { useCallback, useEffect, useState } from "react";
import { getJobs } from "@/services/factoring-risk-report-jobs";

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const { data } = useSession({
    required: true,
  });

  const access_token = data!.access_token;

  const refreshJobs = useCallback(async () => {
    setLoadingJobs(true);
    try {
      const jobs = await getJobs(access_token);
      setJobs(jobs.map((j: Job) => ({ ...j, key: j.id })));
    } catch (error) {}
    setLoadingJobs(false);
  }, [access_token]);

  useEffect(() => {
    refreshJobs();

    return () => {
      setJobs([]);
    };
  }, [access_token, refreshJobs]);

  return (
    <div className="flex flex-col gap-4">
      <CreateJobForm refreshJobs={refreshJobs} />
      <JobsTable jobs={jobs} loadingJobs={loadingJobs} />
    </div>
  );
}
