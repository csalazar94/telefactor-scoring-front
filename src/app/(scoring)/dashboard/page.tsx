"use client";

import { useSession } from "next-auth/react";
import CreateJobForm from "../components/create-job-form";
import JobsTable, { Job } from "../components/jobs-table";
import { useCallback, useEffect, useState } from "react";
import { getJobs } from "@/services/factoring-risk-report-jobs";
import { notification } from "antd";
import Refresh from "../components/refresh";

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [secondsToRefresh, setSecondsToRefresh] = useState(15);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [loadingJobs, setLoadingJobs] = useState(false);
  const { data } = useSession({
    required: true,
  });
  const [api, contextHolder] = notification.useNotification();

  const access_token = data!.access_token;

  const refreshJobs = useCallback(async () => {
    setLoadingJobs(true);
    try {
      const jobs = await getJobs(access_token);
      setJobs(jobs.map((j: Job) => ({ ...j, key: j.id })));
    } catch (error) {
      api.error({
        message: "Error",
        description: "Ocurrió un error al obtener los reportes",
      });
    }
    setLoadingJobs(false);
  }, [access_token, api]);

  useEffect(() => {
    refreshJobs();

    return () => {
      setJobs([]);
    };
  }, [access_token, refreshJobs]);

  useEffect(() => {
    if (jobs.some((j: Job) => ["active", "waiting"].includes(j.state))) {
      setTimer(
        setTimeout(() => {
          if (secondsToRefresh > 0) {
            setSecondsToRefresh(secondsToRefresh - 1);
          } else {
            setTimer(undefined);
            refreshJobs();
            setSecondsToRefresh(15);
          }
        }, 1000),
      );
    } else {
      if (timer) {
        clearInterval(timer);
        setTimer(undefined);
        setSecondsToRefresh(15);
      }
    }
    return () => {
      if (timer) {
        clearInterval(timer);
        setTimer(undefined);
      }
    };
  }, [jobs, secondsToRefresh]);

  return (
    <div className="flex flex-col gap-4">
      {contextHolder}
      <CreateJobForm refreshJobs={refreshJobs} />
      <Refresh
        secondsToRefresh={timer && secondsToRefresh}
        refreshJobs={refreshJobs}
        loadingJobs={loadingJobs}
      />
      <JobsTable jobs={jobs} loadingJobs={loadingJobs} />
    </div>
  );
}
