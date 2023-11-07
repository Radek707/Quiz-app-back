import {Body, Controller, Get, Inject, Post} from '@nestjs/common';
import {LearningService} from "./learning.service";
import {QuestionService} from "../question/question.service";

@Controller('learning')
export class LearningController {
    constructor(
        @Inject(LearningService) private learningService: LearningService,
        @Inject(QuestionService) private questionService: QuestionService,
    ) {
    }

    @Get('/')
    getQuestionsToLearn(): Promise<any> {
        return this.learningService.getQuestionsToLearn();
    }

    @Get('/setup')
    async setUpQuestionsToLearn(): Promise<string> {
        const questions = await this.questionService.getQuestions();
        return this.learningService.setUpQuestionsToLearn(questions);
    }

    @Get('/random')
    getRandomQuestionToLearn(): Promise<any> {
        return this.learningService.getRandomQuestionToLearn();
    }
    @Get('/reset')
    resetQuestionsToLearn(): Promise<any> {
        return this.learningService.resetQuestionsToLearn();
    }

    @Get('/stat')
    getStatistics(): Promise<any> {
        return this.learningService.getStatistics();
    }
    @Post('/')
    checkAnswer(
        @Body() answer: any
    ): Promise<any> {
        console.log(answer);
        return this.learningService.checkAnswer(answer);
    }
}
