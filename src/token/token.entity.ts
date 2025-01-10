import { MainEntity } from 'src/main-classes/mainEntity';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, OneToOne, Unique } from 'typeorm';

export enum TokenType {
  Access = 'access',
  Refresh = 'refresh',
  ResetPassword = 'reset-password',
}
@Entity('tokens')
class TokenEntity extends MainEntity {
  @Column('text', { nullable: true, default: null, unique: true })
  accessToken: string;

  @Column('text', { nullable: true, default: null, unique: true })
  refreshToken: string;

  @Column('timestamp', { nullable: true, default: null })
  refreshExpirationDate: Date;

  @Column('timestamp', { nullable: true, default: null })
  accessExpirationDate: Date;

  @OneToOne(() => UserEntity, (user) => user.token)
  user: UserEntity;
}

export default TokenEntity;
