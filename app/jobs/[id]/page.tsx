import { JobDetails } from "@/components/myJobs/JobDetails";
import { applyResumes, getJobById } from "@/components/myJobs/data";

type JobDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params;
  const job = getJobById(id);

  return <JobDetails job={job} resumes={applyResumes} />;
}