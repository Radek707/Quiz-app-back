import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import {QuestionController} from "./question.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {QuestionEntity} from "./question.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionEntity]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
