import {Injectable} from '@nestjs/common';
import {
    AddQuestionToDbResponse,
    GetQuestionsListResponse,
    QuestionItem,
} from '../types';
import {QuestionEntity} from "./question.entity";

@Injectable()
export class QuestionService {

    getQuestions(): Promise<GetQuestionsListResponse> {
        return QuestionEntity.find();
    }

    async addQuestion(question: QuestionItem): Promise<AddQuestionToDbResponse>{
        let questionEntity = new QuestionEntity();
        questionEntity.questionText = question.questionText;
        questionEntity.correctAnswer = question.correctAnswer;
        questionEntity.wrongAnswer1 = question.correctAnswer;
        questionEntity.wrongAnswer2 = question.wrongAnswer2;
        questionEntity.wrongAnswer3 = question.wrongAnswer3;

        await questionEntity.save();

        return  questionEntity.id;
    }
}
