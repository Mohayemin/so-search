import { User } from './user';
import { Comment } from './comment';

export interface Post {
    body: string;
    owner: User;
    creation_date: number;
    last_activity_date: number;
    score: number;
    creationDateLabel: string;
    lastActivityDateLabel: string;
    comments: Comment[];
}
