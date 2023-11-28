import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { BOT } from '../config.json'

@Injectable()
export class BotService {
  private bot: TelegramBot;

  constructor() {
    const token = BOT.bot_api_token;
    this.bot = new TelegramBot(token, { polling: true });
  }

  async sendMessage(message: string): Promise<void> {
    const chatId = BOT.bot_cht_id;
    await this.bot.sendMessage(chatId, message, { parse_mode: "HTML" });
  }
}