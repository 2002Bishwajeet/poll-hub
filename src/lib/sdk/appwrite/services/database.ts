import { Databases, Functions, type Client } from "appwrite";
import type { Poll } from "../../../models/poll";
import type { DatabaseBase } from "../../databaseBase";

export default class AppwriteDatabase implements DatabaseBase {

    private database: Databases;
    private function: Functions;

    constructor(client: Client) {
        this.database = new Databases(client);
        this.function = new Functions(client);
    }


    public createPoll(poll: Poll) {
        throw new Error("Method not implemented.");
    }
    public fetchPoll(pollId: string) {
        throw new Error("Method not implemented.");
    }
    public streamPoll(pollId: string) {
        throw new Error("Method not implemented.");
    }

}