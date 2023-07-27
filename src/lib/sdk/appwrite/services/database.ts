import { Databases, Functions, type Client, Query } from "appwrite";
import type { Poll } from "../../../models/poll";
import type { DatabaseBase } from "../../databaseBase";
import { VARS } from "../../../system";
import { type Option } from "../../../store/pollOptions";
import type { Vote } from "../../../models/vote";

export default class AppwriteDatabase implements DatabaseBase {

    private database: Databases;
    private function: Functions;
    private client: Client;

    constructor(client: Client) {
        this.client = client;
        this.database = new Databases(client);
        this.function = new Functions(client);
    }
   
    public async createPoll(poll: Omit<Poll, 'id'>) : Promise<Poll> {
        const response = await this.function.createExecution(VARS.CREATE_POLL_FUNCTION_ID, JSON.stringify(poll))
        
        interface PollResponse {
            collectionId: string,
            collectionName: string,
            attributes: string[]
        }
        
        let rawPoll : PollResponse = JSON.parse(response.response);
        console.log(rawPoll);
        return {
            id: rawPoll.collectionId,
            question: rawPoll.collectionName,
            options: rawPoll.attributes.map<Option>((option) => {
                return {
                    id: option,
                    name: option
                }
            }
            )
        }
    }
    public async fetchPoll(pollId: string) {
       const response = await this.database.listDocuments(VARS.DATABASE_ID,pollId, [Query.limit(100)]);
       const documents =response.documents;
       documents.map((document) => {
       });
    }
    public streamPoll(pollId: string) {
     return  this.client.subscribe(`databases.${VARS.DATABASE_ID}.collections.${pollId}.documents`, (event) => {
              console.log(event);
         }
       )

    }

    public async castPoll(poll: Poll,vote: Vote): Promise<void> {
       const  response = this.database.createDocument(VARS.DATABASE_ID, poll.id, vote.id, {
            optionId: vote.id
       });
    }


    public async stopPoll(pollId: string) {
        const response = await this.function.createExecution(VARS.STOP_POLL_FUNCTION_ID,)
    }

}