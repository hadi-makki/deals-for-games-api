import { MainEntity } from 'src/main-classes/mainEntity';
import { Column, Entity, PrimaryColumn, ManyToOne } from 'typeorm';

@Entity('media')
export class MediaEntity extends MainEntity {
  @Column()
  @PrimaryColumn()
  s3Key: string;

  @Column()
  originalName: string;

  @Column({ nullable: true, default: null })
  fileName: string;

  @Column('int')
  size: number;

  @Column()
  mimeType: string;

  // @ManyToOne(() => UserEntity, (user) => user.media)
  // user: UserEntity;

  @Column('uuid')
  userId: string;
}
