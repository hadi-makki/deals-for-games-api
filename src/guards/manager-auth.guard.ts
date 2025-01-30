import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerEntity } from 'src/manager/manager.entity';
import { TokenService } from 'src/token/token.service';
import { Repository } from 'typeorm';

@Injectable()
export class ManagerAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(ManagerEntity)
    private managerRepository: Repository<ManagerEntity>,
    private readonly tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('this is the manager auth guard');
    const request = context.switchToHttp().getRequest();

    const validatedData = await this.tokenService.validateJwt(
      context.switchToHttp().getRequest(),
      context.switchToHttp().getResponse(),
    );

    const userId = validatedData?.sub;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    const user = await this.managerRepository.findOne({
      where: { id: userId },
    });
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    request.user = user;

    return true;
  }
}
