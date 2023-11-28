import { Injectable } from '@nestjs/common';
import { ShortPhoneFeedbackDto } from './dto/short-phone-feedback.dto';
import { Feedback, FeedbackDocument } from './entities/feedback.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleDocument } from 'src/article/entities/article.entity';
import { FullPhoneFeedbackDto } from './dto/full-phone-feedback.dto';
import { EmailFeedbackDto } from './dto/email-feebback.dto';
import { BotService } from 'src/bot/bot.service';
import { BOT } from '../config.json'

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private feedbackModel: Model<ArticleDocument>,
    private readonly telegramService: BotService,
    ) {}

  async getAll() {
    return await this.feedbackModel.find().exec();
  }

  async getById(id: string): Promise<FeedbackDocument> {
    return await  this.feedbackModel.findById(id);
  }

  async createShortFeedback(dto: ShortPhoneFeedbackDto) {
    const feedback = new this.feedbackModel({
      name: dto.name,
      phone: dto.phone
    });
  
    await feedback.save();
  
    const message = `<b>${dto.name}</b> has left a feedback, please contact him. \nPhone: ${dto.phone}`;
  
    await this.telegramService.sendMessage(message);
  
    return feedback;
  }

  async createFullFeedback(dto: FullPhoneFeedbackDto) {
    const feedback = new this.feedbackModel({
      name: dto.name,
      phone: dto.phone,
      content: dto.content,
    })

    await feedback.save()

    const message = `<b>${dto.name}</b> has left a feedback. \n Message: <i>"${dto.content}"</i> \nPlease contact him. \nPhone: ${dto.phone}`;
  
    await this.telegramService.sendMessage(message);

    return feedback;
  }

  async createEmailFeedback(dto: EmailFeedbackDto) {
    const feedback = new this.feedbackModel({
      email: dto.email,
    })

    await feedback.save()

    const message = `A person has left a feedback. \nPlease contact him via email: <a>${dto.email}</a>`;
  
    await this.telegramService.sendMessage(message);

    return feedback;
  }
}
