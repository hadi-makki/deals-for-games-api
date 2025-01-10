import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/request/login.dto';
import { RegisterDto } from './dtos/request/register.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from 'src/error/api-responses.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/users.decorator';
import { UserEntity } from 'src/user/user.entity';

@Controller('auth')
@ApiTags('auth')
@ApiBadRequestResponse()
@ApiInternalServerErrorResponse()
@ApiNotFoundResponse()
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('register')
  @ApiBody({
    type: RegisterDto,
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.AuthService.register(registerDto);
  }

  @Post('login')
  @ApiBody({
    type: LoginDto,
  })
  async login(@Body() loginDto: LoginDto) {
    return await this.AuthService.login(loginDto);
  }

  @Get('test')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async test(@User() user: UserEntity) {
    console.log(user);
    return this.AuthService.test();
  }
}
