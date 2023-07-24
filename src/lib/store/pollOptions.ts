import { writable } from "svelte/store";


export type Option = {
    id: string,
    name: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export const pollOptions = writable<Option[]>([]);


export const insertOption = (option: Option) => {
    pollOptions.update((all) => {
        return [option, ...all];
    });
}


export const removeOption = (id: string) => {
    pollOptions.update((all) => all.filter((t) => t.id !== id));
}