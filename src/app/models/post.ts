import { User } from './user';

export interface Post {
    body: string,
    owner: User,
    creation_date: string,
    last_activity_date: string,
    score: number,

}
