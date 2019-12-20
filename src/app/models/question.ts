import { User } from './user';

export interface Question {
    question_id: number,
    tags: string[],
    owner: User,
    creation_date: Date,
    is_answered: boolean,
    answer_count: number,
    score: number,
    link: string,
    title: string,
    body: string,
    answers: any[];
}
