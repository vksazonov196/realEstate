import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO } from 'src/config.json';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthTestModule } from './auth-test/auth-test.module';
import { ArticleModule } from './article/article.module';
import { RealEstateModule } from './real-estate/real-estate.module';
import { FileModule } from './file/file.module';
import { CDN } from './config.json'
import { FeedbackModule } from './feedback/feedback.module';
import { BotModule } from './bot/bot.module';

interface MongoConfig {
	username: string;
	password: string;
	host: string;
	database: string;
}

function parseMongoConfig(config: MongoConfig) {
	return `mongodb+srv://${config.username}:${config.password}@${config.host}/${config.database}`;
}

@Module({
	imports: [
		MongooseModule.forRoot(parseMongoConfig(MONGO)),
		AuthTestModule,
		AuthModule,
		UserModule,
		ArticleModule,
		RealEstateModule,
    FileModule.forRoot(CDN),
    FeedbackModule,
    BotModule,
	],
	providers: [],
})
export class AppModule {}
