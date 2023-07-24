import type { Option } from "../store/pollOptions";

export interface Poll {
    id: string;
    question: string;
    options: Option[];
}

