"use client";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import React from "react";

export const WorkspaceSwitcher = () => {
  const { data } = useGetWorkspaces();

  return <div>{JSON.stringify(data?.total)}</div>;
};
