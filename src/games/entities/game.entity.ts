import { MainEntity } from 'src/main-classes/mainEntity';
import { Column, Entity } from 'typeorm';

@Entity('game')
export class Game extends MainEntity {
  @Column('text')
  name: string;

  @Column('uuid')
  imageId: string;

  @Column('float')
  price: number;
}
