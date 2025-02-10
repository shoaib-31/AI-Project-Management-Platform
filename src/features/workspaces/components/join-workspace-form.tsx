"use client";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useRouter } from "next/navigation";

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string;
  };
}

export const JoinWorkspaceForm = ({
  initialValues,
}: JoinWorkspaceFormProps) => {
  const router = useRouter();
  const inviteCode = useInviteCode();
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useJoinWorkspace();

  const onSubmit = () => {
    mutate(
      { param: { workspaceId }, json: { code: inviteCode } },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  return (
    <Card className=" w-full h-full border-none shadow-none">
      <CardHeader className=" p-7">
        <CardTitle className=" text-xl font-bold">Join Workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join a{" "}
          <strong>{initialValues.name}</strong>.
        </CardDescription>
      </CardHeader>
      <div className=" px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col gap-2 lg:flex-row items-center justify-between">
          <Button
            className=" w-full lg:w-fit"
            variant="secondary"
            type="button"
            asChild
            disabled={isPending}
            size="lg"
          >
            <Link href="/">Cancel</Link>
          </Button>
          <Button
            size="lg"
            disabled={isPending}
            type="button"
            onClick={onSubmit}
            className=" w-full lg:w-fit"
          >
            Join Workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
