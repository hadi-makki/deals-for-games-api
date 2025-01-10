import { Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/request/login.dto';
import { TokenService } from 'src/token/token.service';
import { UserCreatedDto } from './dtos/response/user-created.dto';
import { UserService } from 'src/user/user.service';
import { NotFoundException } from 'src/error/not-found-error';
import { BadRequestException } from 'src/error/bad-request-error';
import { returnUser } from 'src/utils/helprt-functions';
import { RegisterDto } from './dtos/request/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}
  async login({ email, password }: LoginDto): Promise<UserCreatedDto> {
    const getUser = await this.userService.getUserByEmail(email);
    if (!getUser) {
      throw new BadRequestException('Wrong Email or Password');
    }
    const isPasswordValid = await getUser.comparePassword(password);
    if (!isPasswordValid) {
      throw new BadRequestException('Wrong Email or Password');
    }
    const generateTokens = await this.tokenService.generateTokens(getUser.id);
    return { ...returnUser(getUser), token: generateTokens.accessToken };
  }

  async register({
    email,
    name,
    password,
  }: RegisterDto): Promise<UserCreatedDto> {
    const checkEmail = await this.userService.getUserByEmail(email);
    if (checkEmail) {
      throw new BadRequestException('Email already exists');
    }
    const hashPass = await this.userService.hashPassword(password);
    const newUser = await this.userService.createUser({
      email,
      name,
      password: hashPass,
    });
    const generateTokens = await this.tokenService.generateTokens(newUser.id);
    return { ...returnUser(newUser), token: generateTokens.accessToken };
  }

  async test() {
    this.userService.test();
    return 'test';
  }
}
