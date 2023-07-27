import type { Poll } from "../models/poll";
import type { PollResult } from "../models/pollResults";
import type { Vote } from "../models/vote";

export abstract class DatabaseBase {

    public abstract createPoll(poll: Poll): Promise<Poll> | Poll;

    public abstract fetchPoll(poll: Poll) : PollResult[] | Promise<PollResult[]>;

    public abstract streamPoll(poll: Poll, cb: (vote: Vote) => void | PromiseLike<void>);

    public abstract stopPoll(pollId: string);

    public abstract castPoll(pollId: string, vote: Vote): Promise<void> | void;

}