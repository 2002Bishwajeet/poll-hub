import { Databases, Functions, type Client } from "appwrite";
import type { Poll } from "../../../models/poll";
import type { DatabaseBase } from "../../databaseBase";
import { VARS } from "../../../system";

export default class AppwriteDatabase implements DatabaseBase {

    private database: Databases;
    private function: Functions;

    constructor(client: Client) {
        this.database = new Databases(client);
        this.function = new Functions(client);
    }


    public async createPoll(poll: Omit<Poll, 'id'>) : Promise<Poll> {
        const response = await this.function.createExecution(VARS.FUNCTION_ID, JSON.stringify(poll))
        let rawPoll = JSON.parse(response.response);
        console.log(rawPoll);
        return {
            id: rawPoll.collectionId,
            question: rawPoll.collectionName,
            options: []
        }
    }
    public fetchPoll(pollId: string) {
        throw new Error("Method not implemented.");
    }
    public streamPoll(pollId: string) {
        throw new Error("Method not implemented.");
    }

}