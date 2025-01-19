import { MainEntity } from 'src/main-classes/mainEntity';
import TokenEntity from 'src/token/token.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('manager')
export class ManagerEntity extends MainEntity {
  @Column('text', { nullable: false, unique: true })
  username: string;

  @Column('text', { nullable: false })
  password: string;

  @Column('text', { nullable: false, unique: true })
  email: string;

  @OneToOne(() => TokenEntity, (token) => token.manager)
  @JoinColumn()
  token: TokenEntity;

  async isPasswordMatch(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
