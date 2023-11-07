import {Injectable} from '@nestjs/common';
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource, MoreThan} from "typeorm";
import {Learning} from "./learning.entity";
import {QuestionService} from "../question/question.service";
import {GetQuestionsListResponse, QuestionItem} from "../types";
import {QuestionEntity} from "../question/question.entity";

@Injectable()
export class LearningService {
    constructor(
        @InjectDataSource()
        private dataSource: DataSource
    ) {
    }

    getRandomItem(arr) {

        // get random index value
        const randomIndex = Math.floor(Math.random() * arr.length);

        // get random item
        const item = arr[randomIndex];

        return item;
    }

    async getQuestionsToLearn() {
        const questions = await this.dataSource
            .getRepository(Learning)
            .createQueryBuilder("learning")
            .leftJoinAndSelect("learning.question", "question")
            .getMany();
        const response = questions.map((question) => ({
            id: question.id,
            attempts: question.attempts,
            isSuccess: question.isSuccess,
            question: question.question.questionText,
            answers: [question.question.correctAnswer,
                question.question.wrongAnswer1,
                question.question.wrongAnswer2,
                question.question.wrongAnswer3,],
        }));
        return response;
    }

    async getRandomQuestionToLearn() {
        const questions = await this.dataSource
            .getRepository(Learning)
            .createQueryBuilder("learning")
            .where({isAnswered: false})
            .andWhere({isSuccess: false})
            .leftJoinAndSelect("learning.question", "question")
            .getMany();

        const response = questions.map((question) => ({
            id: question.id,
            question: question.question.questionText,
            answers: [question.question.correctAnswer,
                question.question.wrongAnswer1,
                question.question.wrongAnswer2,
                question.question.wrongAnswer3,],
            totalQuestions: questions.length,
        }));

        if (questions.length > 0) {
            const randomQuestion = this.getRandomItem(response);
            randomQuestion.answers.sort((a, b) => {
                return 0.5 - Math.random();
            });
            return randomQuestion;
        } else {
            return questions;
        }
    }

    async checkAnswer(answer: any) {
        const question = await this.dataSource
            .getRepository(Learning)
            .createQueryBuilder("learning")
            .where("learning.id = :id", {id: `${answer.id}`})
            .leftJoinAndSelect("learning.question", "question")
            .getOne();

        if (question.question.correctAnswer === answer.answer) {
            if (question.attempts === 0) {
                question.isSuccess = true;
            }
            question.isAnswered = true;
            question.attempts++;
            await question.save();
            console.log("correct answer given");
            return true;
        } else {
            question.isSuccess = false;
            question.attempts++;
            await question.save();
            console.log("wrong answer");
            return false;
        }
    }

    async resetQuestionsToLearn() {
        await this.dataSource
            .createQueryBuilder()
            .update(Learning)
            .where({isSuccess: false})
            .set({
                isAnswered: false,
                attempts: 0,
            })
            .execute()
        return "Ok";
    }

    async setUpQuestionsToLearn(questions: GetQuestionsListResponse) {
        await this.dataSource
            .getRepository(Learning)
            .createQueryBuilder()
            .delete()
            .execute();

        for (const question of questions) {
            let learning = new Learning();
            if (question instanceof QuestionEntity) {
                learning.question = question;
                await learning.save();
            }
        }

        return "Questions have been setup.";
    }

    async getStatistics() {
        const totalQuestionsCount = await this.dataSource
            .getRepository(Learning)
            .createQueryBuilder()
            .getCount();

        const isSuccessQuestionsCount = await this.dataSource
            .getRepository(Learning)
            .createQueryBuilder()
            .where({isSuccess: true})
            .getCount();

        return {
            totalQuestionsCount,
            isSuccessQuestionsCount,
        };
    }
}
