import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe());
	app.setGlobalPrefix('api');

	await app.listen(80);
  console.log(`Server running on port http://localhost:80/`);
}
bootstrap();
