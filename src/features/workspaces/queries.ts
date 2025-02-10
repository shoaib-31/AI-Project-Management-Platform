import { Query } from "node-appwrite";
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { getMember } from "../members/utils";
import { Workspace } from "./types";
import { createSessionClient } from "@/lib/appwrite";

export const getWorkspaces = async () => {
  try {
    const { account, databases } = await createSessionClient();
    const user = await account.get();
    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ]);
    if (members.total === 0) {
      return { documents: [], total: 0 };
    }
    const workspaceIds = members.documents.map((member) => member.workspaceId);
    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)]
    );
    return workspaces;
  } catch {
    return { documents: [], total: 0 };
  }
};

interface getWorkspaceProps {
  workspaceId: string;
}

export const getWorkspace = async ({ workspaceId }: getWorkspaceProps) => {
  try {
    const { account, databases } = await createSessionClient();
    const user = await account.get();
    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId,
    });
    if (!member) return null;
    const workspaces = await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId
    );
    return workspaces;
  } catch {
    return null;
  }
};

interface getWorkspaceInfoProps {
  workspaceId: string;
}

export const getWorkspaceInfo = async ({
  workspaceId,
}: getWorkspaceInfoProps) => {
  try {
    const { databases } = await createSessionClient();
    const workspaces = await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId
    );
    return {
      name: workspaces.name,
    };
  } catch {
    return null;
  }
};
