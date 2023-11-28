import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Feedback, FeedbackSchema } from './entities/feedback.entity';
import { BotModule } from 'src/bot/bot.module';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService],
  imports: [
    MongooseModule.forFeature([{ name: Feedback.name, schema: FeedbackSchema }]),
    BotModule
  ]
})
export class FeedbackModule {}
