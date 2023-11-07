import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {QuestionEntity} from "../question/question.entity";

@Entity()
export class Learning extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "boolean",
        default: false,
    })
    isSuccess: boolean;

    @Column({
        type: "int",
        default: 0,
    })
    attempts: number;

    @Column({
        type: "boolean",
        default: false,
    })
    isAnswered: boolean;

    @OneToOne(() => QuestionEntity, (question) => question.learning, {
        onDelete: "CASCADE",
    })
    @JoinColumn()
    question: QuestionEntity;
}