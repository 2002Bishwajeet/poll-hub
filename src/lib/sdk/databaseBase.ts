import type { Poll } from "../models/poll";
import type { Vote } from "../models/vote";

export abstract class DatabaseBase {

    public abstract createPoll(poll: Poll): Promise<Poll> | Poll;

    public abstract fetchPoll(pollId: string);

    public abstract streamPoll(pollId: string);

    public abstract stopPoll(pollId: string);

    public abstract castPoll(poll: Poll, vote: Vote): Promise<void> | void;

}