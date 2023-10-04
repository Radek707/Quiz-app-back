import {Injectable} from '@nestjs/common';
import {
    AddQuestionToDbResponse, DeleteQuestionResponse,
    GetQuestionsListResponse,
    QuestionItem, UpdateQuestionResponse,
} from '../types';
import {QuestionEntity} from "./question.entity";

@Injectable()
export class QuestionService {

    async getQuestions(): Promise<GetQuestionsListResponse> {
        return await QuestionEntity.find();
    }

    async addQuestion(question: QuestionItem): Promise<AddQuestionToDbResponse> {
        let questionEntity = new QuestionEntity();
        questionEntity.questionText = question.questionText;
        questionEntity.correctAnswer = question.correctAnswer;
        questionEntity.wrongAnswer1 = question.correctAnswer;
        questionEntity.wrongAnswer2 = question.wrongAnswer2;
        questionEntity.wrongAnswer3 = question.wrongAnswer3;

        await questionEntity.save();

        return questionEntity.id;
    }

    async deleteQuestion(id): Promise<DeleteQuestionResponse> {

        try {
            await QuestionEntity.delete(id);
            return {isSuccess: true}
        } catch (e) {
            console.log(e)
        }

        return {isSuccess: false};
    }

    async updateQuestion(question): Promise<UpdateQuestionResponse> {
        let questionEntity = new QuestionEntity();
        ({
            id: questionEntity.id,
            questionText: questionEntity.questionText,
            correctAnswer: questionEntity.correctAnswer,
            correctAnswer: questionEntity.wrongAnswer1,
            wrongAnswer2: questionEntity.wrongAnswer2,
            wrongAnswer3: questionEntity.wrongAnswer3
        } = question);

        try {
            await questionEntity.save();
            return {isSuccess: true};
        } catch (e) {
            console.log(e)
        }

        return {isSuccess: false}
    }
}
