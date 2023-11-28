import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Article, ArticleSchema } from './entities/article.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from 'src/file/file.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    FileModule,
    AuthModule,
]
})
export class ArticleModule {}
