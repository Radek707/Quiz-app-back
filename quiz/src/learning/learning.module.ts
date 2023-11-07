import { Module } from '@nestjs/common';
import { LearningService } from './learning.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {QuestionEntity} from "../question/question.entity";
import {Learning} from "./learning.entity";
import {LearningController} from "./learning.controller";
import {QuestionService} from "../question/question.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Learning]),
  ],
  controllers: [LearningController],
  providers: [LearningService, QuestionService],
  exports: [LearningService],
})
export class LearningModule {}
