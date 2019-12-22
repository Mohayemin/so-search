import { User } from './user';

export interface Comment {
    comment_id: number;
    creation_date: number;
    creationDateLabel: string;
    post_id: number;
    body: string;
    edited: boolean;
    score: boolean;
    owner: User;
    makesObsolete: boolean;
}
