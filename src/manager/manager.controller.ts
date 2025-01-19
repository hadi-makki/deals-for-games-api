import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateManagerDto } from './dtos/create-manager.dto';
import { LoginManagerDto } from './dtos/login-manager.dto';
import { UpdateManagerDto } from './dtos/update-manager.sto';
import { ManagerEntity } from './manager.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ManagerService } from './manager.service';
import { ManagerCreatedDto } from './dtos/manager-created.dto';
import { ManagerCreatedWithTokenDto } from './dtos/manager-created-with-token.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from 'src/error/api-responses.decorator';
import { ManagerAuthGuard } from 'src/guards/manager-auth.guard';
import { User } from 'src/decorators/users.decorator';
import { SuccessMessageReturn } from 'src/main-classes/success-message-return';
import { returnManager } from 'src/functions/returnUser';
@Controller('manager')
@ApiTags('Manager')
@ApiInternalServerErrorResponse()
export class ManagerController {
  constructor(private readonly ManagerService: ManagerService) {}

  @Post('/create')
  @UseGuards(ManagerAuthGuard)
  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiCreatedResponse({
    description: 'Manager created successfully',
    type: ManagerCreatedDto,
  })
  createManager(@Body() body: CreateManagerDto) {
    return this.ManagerService.createManager(body);
  }

  @Get(':id')
  @UseGuards(ManagerAuthGuard)
  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: ManagerEntity })
  @ApiNotFoundResponse('Manager not found')
  findOne(@Param('id') id: string) {
    return this.ManagerService.findOne(id);
  }

  @Post('login')
  @ApiBadRequestResponse()
  @ApiCreatedResponse({
    description: 'Manager logged in successfully',
    type: ManagerCreatedWithTokenDto,
  })
  @ApiNotFoundResponse('Manager not found')
  login(@Body() body: LoginManagerDto) {
    return this.ManagerService.login(body);
  }

  @Post('logout')
  @UseGuards(ManagerAuthGuard)
  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: SuccessMessageReturn })
  async logout(@User() user: ManagerEntity) {
    return this.ManagerService.logout(user);
  }

  @Get('get/me')
  @UseGuards(ManagerAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ManagerEntity })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  async me(@User() user: ManagerEntity) {
    return returnManager(user);
  }

  @Get()
  @UseGuards(ManagerAuthGuard)
  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: [ManagerEntity] })
  getAll() {
    return this.ManagerService.getAll();
  }
  @Delete(':id')
  @UseGuards(ManagerAuthGuard)
  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: SuccessMessageReturn })
  deleteManager(@Param('id') id: string) {
    return this.ManagerService.deleteManager(id);
  }

  @Patch('/update/:id')
  @UseGuards(ManagerAuthGuard)
  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse('Manager not found')
  @ApiOkResponse({ type: ManagerEntity })
  updateManager(@Param('id') id: string, @Body() body: UpdateManagerDto) {
    return this.ManagerService.updateManager(id, body);
  }
}
