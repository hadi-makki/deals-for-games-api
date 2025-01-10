import { MainEntity } from 'src/main-classes/mainEntity';
import { Column, Entity } from 'typeorm';

@Entity('faq')
export class Faq extends MainEntity {
  @Column('text')
  question: string;
  @Column('text')
  answer: string;
}
