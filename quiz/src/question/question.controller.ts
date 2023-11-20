import {Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards} from '@nestjs/common';
import {QuestionService} from './question.service';
import {
    AddQuestionToDbResponse, GetQuestionResponse,
    GetQuestionsListResponse,
    QuestionItem,
} from '../types';
import {QuestionEntity} from "./question.entity";
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtGuard)
@Controller('question')
export class QuestionController {
    constructor(
        @Inject(QuestionService) private questionService: QuestionService,
    ) {}

    @Get('/')
    getQuestionsList(): Promise<GetQuestionsListResponse> {
        return this.questionService.getQuestions();
    }

    @Get('/:id')
    getQuestion(
        @Param() id: string,
    ): Promise<QuestionEntity> {
        return this.questionService.findQuestionById(id);
    }

    @Get('/find/:searchTerm')
    findQuestion(
        @Param('searchTerm') searchTerm: string,
    ) {
        return this.questionService.findQuestion(searchTerm);
    }

    @Post('/')
    addQuestion(
        @Body() question: QuestionItem,
    ): Promise<AddQuestionToDbResponse> {
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
        return this.questionService.updateQuestion({question: question});
    }

}
