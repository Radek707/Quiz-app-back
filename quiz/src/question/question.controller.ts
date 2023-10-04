import {Body, Controller, Get, Inject, Post} from '@nestjs/common';
import {QuestionService} from "./question.service";
import {AddQuestionToDbResponse, GetQuestionsListResponse, QuestionItem} from "../types";

@Controller('question')
export class QuestionController {

    constructor(
        @Inject(QuestionService) private questionService: QuestionService,
    ){}

    @Get('/')
    getQuestionsList(): GetQuestionsListResponse {
        return this.questionService.getQuestions();
    }

    @Post('/')
    addQuestion(
        @Body() question: QuestionItem,
    ): AddQuestionToDbResponse {
        return this.questionService.addQuestion(question);
    }
}
