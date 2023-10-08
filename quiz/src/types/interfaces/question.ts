export interface QuestionItem {
    id?: string;
    questionText: string;
    correctAnswer: string;
    wrongAnswer1: string;
    wrongAnswer2: string;
    wrongAnswer3: string;
}

export type AddQuestionToDbResponse = string;

export type GetQuestionResponse = QuestionItem;

export type GetQuestionsListResponse = QuestionItem[];

export type DeleteQuestionResponse = {
    isSuccess: boolean;
}

export type UpdateQuestionResponse = {
    isSuccess: boolean;
}