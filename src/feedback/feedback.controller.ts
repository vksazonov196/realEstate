import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { ShortPhoneFeedbackDto } from './dto/short-phone-feedback.dto';
import { FullPhoneFeedbackDto } from './dto/full-phone-feedback.dto';
import { EmailFeedbackDto } from './dto/email-feebback.dto';
import { FeedbackDocument } from './entities/feedback.entity';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('short')
  createShort(@Body() shortFeedbackDto: ShortPhoneFeedbackDto) {
    return this.feedbackService.createShortFeedback(shortFeedbackDto);
  }

  @Post('full')
  createFull(@Body() fullFeedbackDto: FullPhoneFeedbackDto) {
    return this.feedbackService.createFullFeedback(fullFeedbackDto);
  }

  @Post('email')
  createEmail(@Body() emailFeedbackDto: EmailFeedbackDto) {
    return this.feedbackService.createEmailFeedback(emailFeedbackDto);
  }

  @Get()
  findAll() {
    return this.feedbackService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<FeedbackDocument> {
    return this.feedbackService.getById(id);
  }
}
