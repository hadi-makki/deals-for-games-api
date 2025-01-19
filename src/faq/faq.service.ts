import { Injectable } from '@nestjs/common';
import { CreateFaqDto } from './dto/request/create-faq.dto';
import { FaqEntity } from './entities/faq.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatedFaqDto } from './dto/response/created-faq.dto';
import { ForbiddenException } from 'src/error/forbidden-error';
import { SuccessMessageReturn } from 'src/main-classes/success-message-return';
import { NotFoundException } from 'src/error/not-found-error';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(FaqEntity)
    private readonly faqRepository: Repository<FaqEntity>,
  ) {}
  async create(createFaqDto: CreateFaqDto): Promise<CreatedFaqDto> {
    const checkFaq = await this.faqRepository.findOne({
      where: {
        question: createFaqDto.question,
      },
    });
    if (checkFaq) {
      throw new ForbiddenException('Faq already exists');
    }
    const saveFaq = await this.faqRepository.save(createFaqDto);
    return saveFaq;
  }

  async findAll(): Promise<CreatedFaqDto[]> {
    return await this.faqRepository.find();
  }

  async findOne(id: string): Promise<CreatedFaqDto> {
    const getFaq = await this.faqRepository.findOne({
      where: {
        id,
      },
    });

    if (!getFaq) {
      throw new NotFoundException('Faq not found');
    }

    return getFaq;
  }

  async update(id: string, updateFaqDto: CreateFaqDto): Promise<CreatedFaqDto> {
    const faq = await this.faqRepository.findOne({
      where: {
        id,
      },
    });

    if (!faq) {
      throw new NotFoundException('Faq not found');
    }

    faq.question = updateFaqDto.question;
    faq.answer = updateFaqDto.answer;

    await this.faqRepository.save(faq);

    return faq;
  }

  async remove(id: string): Promise<SuccessMessageReturn> {
    const faq = await this.faqRepository.findOne({
      where: {
        id,
      },
    });

    if (!faq) {
      throw new NotFoundException('Faq not found');
    }

    await this.faqRepository.remove(faq);

    return {
      message: 'Faq deleted successfully',
    };
  }
}
