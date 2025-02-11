import { getCurrent } from "@/features/auth/queries";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";
import React from "react";

interface ProjectIdPageProps {
  params: {
    projectId: string;
  };
}

const ProjectIdPage = async ({ params }: ProjectIdPageProps) => {
  const user = getCurrent();
  if (!user) redirect("/sign-in");
  const initialValues = await getProject({ projectId: params.projectId });
  return (
    <div className="flex flex-col gap-y-4">{JSON.stringify(initialValues)}</div>
  );
};

export default ProjectIdPage;
