import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { CanActivate } from '@nestjs/common/interfaces/features/can-activate.interface';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
import { UserEntity } from 'src/user/user.entity';
import { ManagerEntity } from 'src/manager/manager.entity';
import { UnauthorizedException } from 'src/error/unauthorized-error';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(ManagerEntity)
    private managerRepository: Repository<ManagerEntity>,
    private tokenService: TokenService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const validatedData = await this.tokenService.validateJwt(
      context.switchToHttp().getRequest(),
      context.switchToHttp().getResponse(),
    );

    const userId = validatedData?.sub;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    const user = await this.usersRepository.findOneBy({ id: userId });

    if (user) {
      request.user = user;
      return true;
    }

    const manager = await this.managerRepository.findOneBy({
      id: userId,
    });

    if (manager) {
      request.user = manager;
      return true;
    }

    throw new UnauthorizedException('Unauthorized');
  }
}
