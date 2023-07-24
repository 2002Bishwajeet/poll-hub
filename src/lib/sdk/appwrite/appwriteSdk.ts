import { Client } from "appwrite";
import type SDK from "../sdk";
import type { AuthenticationBase } from "../authenticationBase";
import type { DatabaseBase } from "../databaseBase";
import { VARS } from "../../system";
import AppwriteAuthentication from "./services/authentication";
import AppwriteDatabase from "./services/database";

export default class AppwriteSDK implements SDK {

    private client: Client = new Client();


    constructor() {
        this.client = new Client().setEndpoint(VARS.APPWRITE_ENDPOINT)
            .setProject(VARS.PROJECT_ID);
    }

    Authentication: AuthenticationBase = new AppwriteAuthentication(this.client);
    Database: DatabaseBase = new AppwriteDatabase(this.client);
}