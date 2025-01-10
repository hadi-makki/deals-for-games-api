import { MainEntity } from 'src/main-classes/mainEntity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import TokenEntity from 'src/token/token.entity';

@Entity('user')
export class UserEntity extends MainEntity {
  @Column('text', { nullable: false })
  email: string;

  @Column('text', { nullable: false })
  password: string;

  @Column('text', { nullable: false })
  name: string;

  @OneToOne(() => TokenEntity, (profile) => profile.user) // specify inverse side as a second parameter
  @JoinColumn()
  token: TokenEntity;

  async comparePassword(oldPassword: string) {
    return await bcrypt.compare(oldPassword, this.password);
  }
}
