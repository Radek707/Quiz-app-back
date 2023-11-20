import {Injectable, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {InjectDataSource, TypeOrmModule} from '@nestjs/typeorm';
import {config} from './config/config';
import {QuestionModule} from './question/question.module';
import {DataSource} from "typeorm";
import {QuestionEntity} from "./question/question.entity";
import { LearningController } from './learning/learning.controller';
import { LearningModule } from './learning/learning.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: config.dbHost,
            port: 3306,
            username: config.dbUser,
            password: config.dbPassword,
            database: config.dbDatabase,
            entities: [],
            bigNumberStrings: false,
            logging: true,
            synchronize: true,
            autoLoadEntities: true,
        }),
        QuestionModule,
        LearningModule,
        UserModule,
        AuthModule,
    ],
    controllers: [AppController, LearningController],
    providers: [AppService],
})
export class AppModule {
}
