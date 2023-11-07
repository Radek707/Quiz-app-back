import {Injectable} from '@nestjs/common';
import {
    AddQuestionToDbResponse, DeleteQuestionResponse, GetQuestionResponse,
    GetQuestionsListResponse,
    QuestionItem, UpdateQuestionResponse,
} from '../types';
import {QuestionEntity} from "./question.entity";
import {DataSource} from "typeorm";
import {InjectDataSource} from "@nestjs/typeorm";

@Injectable()
export class QuestionService {

    constructor(
        @InjectDataSource()
        private dataSource: DataSource
    ) { }

    async getQuestions(): Promise<GetQuestionsListResponse> {
        return await QuestionEntity.find();
    }

    async addQuestion(question: QuestionItem): Promise<AddQuestionToDbResponse> {
        let questionEntity = new QuestionEntity();
        questionEntity.questionText = question.questionText;
        questionEntity.correctAnswer = question.correctAnswer;
        questionEntity.wrongAnswer1 = question.wrongAnswer1;
        questionEntity.wrongAnswer2 = question.wrongAnswer2;
        questionEntity.wrongAnswer3 = question.wrongAnswer3;

        await questionEntity.save();

        return questionEntity.id;
    }

    async deleteQuestion(id: string): Promise<DeleteQuestionResponse> {

        try {
            await QuestionEntity.delete(id);
            return {isSuccess: true}
        } catch (e) {
            console.log(e)
        }

        return {isSuccess: false};
    }

    async updateQuestion({question}: { question: QuestionItem }): Promise<UpdateQuestionResponse> {
        let questionEntity = new QuestionEntity();
        ({
            id: questionEntity.id,
            questionText: questionEntity.questionText,
            correctAnswer: questionEntity.correctAnswer,
            wrongAnswer1: questionEntity.wrongAnswer1,
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

    async findQuestionById(id: string): Promise<QuestionEntity> {
        // @ts-ignore
        return await QuestionEntity.findBy(id);
    }

    async findQuestion(searchTerm: string) {
        console.log("Searching for: ", searchTerm);
        const search = searchTerm;
        console.log(search);
        const response = await this.dataSource
            .createQueryBuilder()
            .select("question")
            .from(QuestionEntity, "question")
            .where("question.questionText LIKE :questionText", {
                questionText: `%${search}%`,
            })
            .getMany()
        return response;
    }
}
