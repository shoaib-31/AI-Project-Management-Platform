import { getCurrent } from "@/features/auth/actions";
import { getWorkspace } from "@/features/workspaces/actions";
import { UpdateWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { redirect } from "next/navigation";
import React from "react";

interface WorkspaceIdSettingsPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdSettingsPage = async ({
  params,
}: WorkspaceIdSettingsPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  const intialValues = await getWorkspace({ workspaceId: params.workspaceId });
  if (!intialValues) redirect(`/workspaces/${params.workspaceId}`);
  return (
    <div className=" w-full lg:max-w-xl">
      <UpdateWorkspaceForm intialValues={intialValues} />
    </div>
  );
};

export default WorkspaceIdSettingsPage;
