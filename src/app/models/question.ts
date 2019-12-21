import { Answer } from './answer';
import { Post } from './post';

export interface Question extends Post {
    question_id: number;
    tags: string[];
    is_answered: boolean;
    answer_count: number;
    view_count: number;
    link: string;
    bounty_amount: number;
    title: string;
    answers: Answer[];
    hasObsoleteAnswer: boolean;
    isAboutObsolete: boolean;
}

