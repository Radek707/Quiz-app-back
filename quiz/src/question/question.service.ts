import { Injectable } from '@nestjs/common';
import {AddQuestionToDbResponse, GetQuestionsListResponse, QuestionItem} from "../types";

@Injectable()
export class QuestionService {
    private questions: QuestionItem[] = [];

    getQuestions(): GetQuestionsListResponse {
        console.log("Questions array");
        return [
            {
                id: 1,
                questionText: "4 x 4",
                correctAnswer: "16",
                wrongAnswers: ["6", "12", "21"],
            },
            {
                id: 2,
                questionText: "2 x 4",
                correctAnswer: "8",
                wrongAnswers: ["6", "12", "16"],
            },
            {
                id: 3,
                questionText: "4 x 6",
                correctAnswer: "24",
                wrongAnswers: ["10", "18", "26"],
            }
        ]
    }

    addQuestion(question: QuestionItem): AddQuestionToDbResponse {
        this.questions.push(question);

        console.log(this.questions);

        const isSuccessful = true
        return {isSuccessful};
    }
}
