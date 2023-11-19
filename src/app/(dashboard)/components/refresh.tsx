"use client";

import { ReloadOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function Refresh({
  secondsToRefresh,
  refreshJobs,
  loadingJobs,
}: {
  secondsToRefresh: number | undefined;
  refreshJobs: Function;
  loadingJobs: boolean;
}) {
  return (
    <div className="flex flex-row gap-4 items-center">
      <Button
        disabled={loadingJobs}
        onClick={() => refreshJobs()}
        icon={<ReloadOutlined />}
      />
      {!!secondsToRefresh &&
        `Recargando automáticamente en ${secondsToRefresh}s...`}
    </div>
  );
}
