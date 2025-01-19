// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManagerEntity } from './manager.entity';
import { CreateManagerDto } from './dtos/create-manager.dto';
import { ManagerCreatedWithTokenDto } from './dtos/manager-created-with-token.dto';
import { BadRequestException } from 'src/error/bad-request-error';
import { TokenService } from 'src/token/token.service';
import { returnManager } from 'src/functions/returnUser';
import { ManagerCreatedDto } from './dtos/manager-created.dto';
import { isUUID } from 'class-validator';
import { NotFoundException } from 'src/error/not-found-error';
import { LoginManagerDto } from './dtos/login-manager.dto';
import { SuccessMessageReturn } from 'src/main-classes/success-message-return';
import { UpdateManagerDto } from './dtos/update-manager.sto';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(ManagerEntity)
    private readonly managerEntity: Repository<ManagerEntity>,
    private readonly tokenService: TokenService,
  ) {}

  async createManager(
    body: CreateManagerDto,
  ): Promise<ManagerCreatedWithTokenDto> {
    const manager = await this.managerEntity.findOne({
      where: [{ email: body.email }, { username: body.username }],
    });
    if (manager) {
      throw new BadRequestException(
        'User with this email or username already exists',
      );
    }

    const hashedPassword = await ManagerEntity.hashPassword(body.password);
    const user = this.managerEntity.create({
      email: body.email.trim().toLowerCase(),
      password: hashedPassword,
      username: body.username.trim(),
    });
    const savedUser = await this.managerEntity.save(user);

    const token = await this.tokenService.generateTokens({
      managerId: savedUser.id,
      userId: null,
    });
    return {
      ...returnManager(user),
      token: token.accessToken,
    };
  }

  async findOne(id: string): Promise<ManagerCreatedDto> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid id');
    }
    const manager = await this.managerEntity.findOne({
      where: { id },
    });
    if (!manager) {
      throw new NotFoundException('Manager not found');
    }
    return returnManager(manager);
  }

  async login(body: LoginManagerDto): Promise<ManagerCreatedWithTokenDto> {
    const user = await this.managerEntity.findOne({
      where: { username: body.username },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordMatch = await user.isPasswordMatch(body.password);
    if (!isPasswordMatch) {
      throw new BadRequestException('Password is incorrect');
    }
    const token = await this.tokenService.generateTokens({
      managerId: user.id,
      userId: null,
    });
    //   ?.token;

    return {
      ...returnManager(user),
      token: token.accessToken,
    };
  }

  async getAll(): Promise<ManagerCreatedDto[]> {
    const managers = await this.managerEntity.find({});
    return managers.map((manager) => returnManager(manager));
  }

  async deleteManager(id: string): Promise<SuccessMessageReturn> {
    const manager = await this.managerEntity.findOne({
      where: { id },
    });
    if (!manager) {
      throw new NotFoundException('Manager not found');
    }
    await this.managerEntity.delete({ id });

    return {
      message: 'Manager deleted successfully',
    };
  }

  async updateManager(
    id: string,
    body: UpdateManagerDto,
  ): Promise<ManagerCreatedDto> {
    const manager = await this.managerEntity.findOne({
      where: { id },
    });
    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    manager.email = body.email;
    manager.username = body.username;
    await this.managerEntity.save(manager);
    return returnManager(manager);
  }

  async logout(user: ManagerEntity): Promise<SuccessMessageReturn> {
    await this.tokenService.deleteTokensByUserId(user.id);
    return {
      message: 'Manager logged out successfully',
    };
  }
}
