import { User } from './user';

export interface Comment {
    comment_id: number;
    creation_date: number;
    post_id: number;
    body: string;
    edited: boolean;
    score: boolean;
    owner: User;
    hasObsoleteKeyword: boolean;
}
