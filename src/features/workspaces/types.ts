import { Models } from "node-appwrite";

export type Workspace = Models.Document & {
  name: string;
  imageUri?: string;
  inviteCode: string;
  userId: string;
};
