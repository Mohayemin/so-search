import { User } from './user';
import { Question } from './question';

export interface Comment {
    comment_id: number;
    creation_date: number;
    post_id: number;
    body: string;
    edited: boolean;
    score: boolean;
    owner: User;
    makesObsolete: boolean;
}
