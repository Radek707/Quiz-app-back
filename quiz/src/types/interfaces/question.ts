export interface QuestionItem {
    id: number;
    questionText: string;
    correctAnswer: string;
    wrongAnswers: string[];
}


export type AddQuestionToDbResponse = {
    isSuccessful: boolean;
}

export type GetQuestionsListResponse = QuestionItem[];