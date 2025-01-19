import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerEntity } from 'src/manager/manager.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagerAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(ManagerEntity)
    private managerRepository: Repository<ManagerEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers['auth_user'];

    const user = await this.managerRepository.findOne({
      where: { id: userId },
    });
    console.log(user);
    if (!user) {
      throw new UnauthorizedException(
        'Unauthorized, user not found in users microservice',
      );
    }

    request.user = user;

    return true;
  }
}
