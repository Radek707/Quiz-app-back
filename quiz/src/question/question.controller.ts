import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import {QuestionService} from './question.service';
import {
    AddQuestionToDbResponse, GetQuestionResponse,
    GetQuestionsListResponse,
    QuestionItem,
} from '../types';

@Controller('question')
export class QuestionController {
    constructor(
        @Inject(QuestionService) private questionService: QuestionService,
    ) {
    }

    @Get('/')
    getQuestionsList(): Promise<GetQuestionsListResponse> {
        return this.questionService.getQuestions();
    }

    @Get('/:id')
    getQuestion(
        @Param() id: string,
    ): Promise<GetQuestionResponse> {
        return this.questionService.findQuestionById(id);
    }
    @Post('/')
    addQuestion(
        @Body() question: QuestionItem,
    ): Promise<AddQuestionToDbResponse>  {
        return this.questionService.addQuestion(question);
    }

    @Delete('/:id')
    deleteQuestion(
        @Param() id: string,
    ) {
        return this.questionService.deleteQuestion(id);
    }

    @Put('/')
    updateQuestion(
        @Body() question: QuestionItem,
    ) {
        return this.questionService.updateQuestion(question);
    }
}
