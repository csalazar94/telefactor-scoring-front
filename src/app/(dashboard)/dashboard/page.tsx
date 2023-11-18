import CreateJobForm from "../components/create-job-form";
import JobsTable from "../components/jobs-table";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <CreateJobForm />
      <JobsTable />
    </div>
  );
}
