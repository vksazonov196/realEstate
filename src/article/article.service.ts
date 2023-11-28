import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article, ArticleDocument } from './entities/article.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { FileService } from 'src/file/file.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    private readonly fileService: FileService,
    ) {}
  async getAll(): Promise<ArticleDocument[]> {
    return await this.articleModel.find().exec();
  }

  async getById(id: string): Promise<ArticleDocument> {
    const estate = await this.articleModel.findById(id);
    if (!estate) {
      throw new NotFoundException();
    }

    return estate;
  }

  async create(dto: CreateArticleDto): Promise<ArticleDocument> {
    const newEstate = new this.articleModel({
      title: dto.title,
      content: dto.content
    })

    await newEstate.save()

    return newEstate;
  }

  async updateById(id: string, dto: CreateArticleDto): Promise<ArticleDocument> {
    const estate = await this.articleModel.findById(id);
    if (!estate) {
      throw new NotFoundException();
    }

    return await this.articleModel.findByIdAndUpdate(
      id,
      { $set: dto },
      { new: true }
    );
  }

  async remove(id: string): Promise<ArticleDocument> {
    const estate = await this.articleModel.findById(id)

    if (!estate) {
      throw new NotFoundException();
    }

    return await this.articleModel.findByIdAndDelete(id);
  }

  async linkFile(articleId: string, file: Express.Multer.File) {
    const article = await this.articleModel.findById(articleId);
    const fileId = uuidv4();
    const fileKey = `article/${fileId}.png`;
    await this.fileService.upload(fileKey, file.buffer);
    article.image = fileKey
    return await article.save();
  }

  async deleteFile(articleId: string) {
    const article = await this.articleModel.findById(articleId);
    await this.fileService.delete(article.image);
    article.image = null
    return await article.save()
  }
}
