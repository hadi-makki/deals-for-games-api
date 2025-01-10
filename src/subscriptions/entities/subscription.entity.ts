import { MainEntity } from 'src/main-classes/mainEntity';
import { Column, Entity } from 'typeorm';

@Entity('subscription')
export class Subscription extends MainEntity {
  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('float')
  price: number;
}
