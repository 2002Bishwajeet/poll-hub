import { Client } from "appwrite";
import { VARS } from "./system";

export const client: Client = new Client()
  .setEndpoint(VARS.APPWRITE_ENDPOINT)
  .setProject(VARS.PROJECT_ID);
