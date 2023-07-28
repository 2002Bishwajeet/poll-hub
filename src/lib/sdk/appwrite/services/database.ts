import { Databases, Functions, type Client, Query } from 'appwrite';
import type { Poll } from '../../../models/poll';
import type { DatabaseBase } from '../../databaseBase';
import { VARS } from '../../../system';
import { type Option } from '../../../store/pollOptions';
import type { Vote } from '../../../models/vote';
import type { PollResult } from '../../../models/pollResults';

export default class AppwriteDatabase implements DatabaseBase {
	private database: Databases;
	private function: Functions;
	private client: Client;

	constructor(client: Client) {
		this.client = client;
		this.database = new Databases(client);
		this.function = new Functions(client);
	}

	public async createPoll(poll: Omit<Poll, 'id'>): Promise<Poll> {
		const response = await this.function.createExecution(
			VARS.CREATE_POLL_FUNCTION_ID,
			JSON.stringify(poll)
		);

		interface PollResponse {
			collectionId: string;
			collectionName: string;
			attributes: string[];
		}

		let rawPoll: PollResponse = JSON.parse(response.response);
		return {
			id: rawPoll.collectionId,
			question: rawPoll.collectionName,
			options: rawPoll.attributes.map<Option>((option) => {
				return {
					id: option,
					name: option
				};
			})
		};
	}
	public async fetchPoll(poll: Poll): Promise<PollResult[]> {
		const response = await this.database.listDocuments(VARS.DATABASE_ID, poll.id, [
			Query.limit(100)
		]);
		const documents = response.documents;
		const options = poll.options.map((opt) => opt.id);
		let result: PollResult[] = options.map((opt) => {
			return {
				optionId: opt,
				value: []
			};
		});
		documents.map((document) => {
			options.forEach((opt) => {
				if (document[opt] != null || document[opt] != undefined) {
					result.find((res) => res.optionId === opt)?.value.push(document[opt]);
				}
			});
		});
		return result;
	}
	public streamPoll(poll: Poll, handleVotes: (vote: Vote) => void | PromiseLike<void>) {
		return this.client.subscribe(
			`databases.${VARS.DATABASE_ID}.collections.${poll.id}.documents`,
			(event) => {
				const votes = poll.options.map((opt) => {
					if (event.payload[opt.id] != null || event.payload[opt.id] != undefined) {
						return {
							id: event.payload['$id'],
							optionId: opt.id
						};
					}
				}).filter((option) => !!option);
				return handleVotes(votes[0]);
			}
		);
	}

	public async castPoll(pollId: string, vote: Vote): Promise<void> {
		const response = await this.database.createDocument(VARS.DATABASE_ID, pollId, vote.id, {
			[vote.optionId]: vote.id
		});
	}

	public async stopPoll(pollId: string) {
		const response = await this.function.createExecution(VARS.STOP_POLL_FUNCTION_ID);
	}
}
