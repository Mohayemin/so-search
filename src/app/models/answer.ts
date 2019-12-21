import { Post } from './post';

export interface Answer extends Post {
    answer_id: number;
    is_accepted: boolean;
}



