import { Models } from "node-appwrite";

export type Project = Models.Document & {
  name: string;
  imageUri?: string;
  workspaceId: string;
};
