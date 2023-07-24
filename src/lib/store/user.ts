import { writable } from "svelte/store";
import type { User } from "../models/userModel";


export const user = writable<User>();