import { writable } from "svelte/store";
import type { PollResult } from "../models/pollResults";
import type { Vote } from "../models/vote";


export const pollResults = writable<PollResult[]>([]);


export const addResult = (result: Vote) => {
    pollResults.update((all) => {
       const index = all.findIndex((res) => res.optionId === result.optionId);
       all[index].value.push(result.id);
         return all;
        
    })
}