import type { Poll } from "../models/poll";

export abstract class DatabaseBase {

    public abstract createPoll(poll: Poll);

    public abstract fetchPoll(pollId: string);

    public abstract streamPoll(pollId: string);
    
}