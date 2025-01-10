import { MainEntity } from 'src/main-classes/mainEntity';
import { Column, Entity } from 'typeorm';

@Entity('card')
export class Card extends MainEntity {
  @Column('text')
  name: string;
}
