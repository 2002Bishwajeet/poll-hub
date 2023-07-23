import type { Poll } from "../../../models/poll";
import { DatabaseBase } from "../../databaseBase";

export class DatabaseMock extends DatabaseBase {
    public createPoll(poll: Poll) {
        throw new Error("Method not implemented.");
    }

    public fetchPoll(pollId: string) { }

    public streamPoll(pollId: string) { }

}