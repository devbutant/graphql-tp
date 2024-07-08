import { User } from "./users";

export interface Post {
    id: number;
    title: string;
    content?: string;
    published?: boolean;
    author?: User;
}
