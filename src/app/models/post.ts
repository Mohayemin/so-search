import { User } from './user';

export interface Post {
    body: string,
    owner: User,
    creation_date: number,
    last_activity_date: number,
    score: number,
    creationDateLabel: string,
    lastActivityDateLabel: string
}
