import { User } from './user';

export interface Question {
    question_id: number,
    tags: string[],
    owner: User,
    creation_date: string,
    last_activity_date: string,
    is_answered: boolean,
    answer_count: number,
    score: number,
    view_count: number,
    link: string,
    title: string,
    body: string,
    answers: any[];
}
