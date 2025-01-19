import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { CanActivate } from '@nestjs/common/interfaces/features/can-activate.interface';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
import { UserEntity } from 'src/user/user.entity';
import { ManagerEntity } from 'src/manager/manager.entity';
import { UnauthorizedException } from 'src/error/unauthorized-error';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(ManagerEntity)
    private managerRepository: Repository<ManagerEntity>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers['auth_user'];

    const user = await this.usersRepository.findOneBy({ id: userId });
    const manager = await this.managerRepository.findOneBy({
      id: userId,
    });
    if (!user && !manager) {
      throw new UnauthorizedException(
        'Unauthorized, user not found in users microservice',
      );
    }

    request.user = user;

    return true;
  }
}
