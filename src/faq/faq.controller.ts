import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/request/create-faq.dto';

import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from 'src/error/api-responses.decorator';
import { ManagerAuthGuard } from 'src/guards/manager-auth.guard';
import { CreatedFaqDto } from './dto/response/created-faq.dto';
import { SuccessMessageReturn } from 'src/main-classes/success-message-return';

@Controller('faq')
@ApiTags('faq')
@ApiNotFoundResponse('Faq not found')
@ApiBadRequestResponse()
@ApiInternalServerErrorResponse()
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(ManagerAuthGuard)
  @ApiCreatedResponse({
    description: 'Faq created successfully',
    type: CreatedFaqDto,
  })
  create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'Faq retrieved successfully',
    type: [CreatedFaqDto],
  })
  findAll() {
    return this.faqService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({
    description: 'Faq retrieved successfully',
    type: CreatedFaqDto,
  })
  findOne(@Param('id') id: string) {
    return this.faqService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(ManagerAuthGuard)
  @ApiCreatedResponse({
    description: 'Faq updated successfully',
    type: CreatedFaqDto,
  })
  update(@Param('id') id: string, @Body() updateFaqDto: CreateFaqDto) {
    return this.faqService.update(id, updateFaqDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(ManagerAuthGuard)
  @ApiCreatedResponse({
    description: 'Faq deleted successfully',
    type: SuccessMessageReturn,
  })
  remove(@Param('id') id: string) {
    return this.faqService.remove(id);
  }
}
