import { MainEntity } from 'src/main-classes/mainEntity';
import { Column, Entity } from 'typeorm';

@Entity('tutorial')
export class Tutorial extends MainEntity {
  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('uuid')
  videoId: string;

  @Column('uuid')
  imageId: string;
}
