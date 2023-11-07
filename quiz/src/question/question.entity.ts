import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {QuestionItem} from "../types";
import {Learning} from "../learning/learning.entity";

@Entity()
export class QuestionEntity extends BaseEntity implements QuestionItem{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        default: '',
    })
    questionText: string;

    @Column({
        type: 'text',
        default: '',
    })
    correctAnswer: string;

    @Column({
        type: 'text',
        default: '',
    })
    wrongAnswer1: string;

    @Column({
        type: 'text',
        default: '',
    })
    wrongAnswer2: string;

    @Column({
        type: 'text',
        default: '',
    })
    wrongAnswer3: string;

    @OneToOne(() => Learning, (learning) => learning.question)
    learning: Learning;
}