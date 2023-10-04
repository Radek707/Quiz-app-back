import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {config} from "./config/config";
import {QuestionModule} from './question/question.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
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
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
