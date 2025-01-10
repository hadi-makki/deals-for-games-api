import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from 'src/auth/dtos/request/register.dto';
import TokenEntity from 'src/token/token.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}
  async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async createUser(data: RegisterDto) {
    return await this.userRepository.save(data);
  }

  async test() {
    return 'test';
  }
}
