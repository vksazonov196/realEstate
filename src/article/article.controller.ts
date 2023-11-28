import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Public } from 'src/auth/decorator/public.decorator';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { FileService } from 'src/file/file.service';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { USER_ROLE } from 'src/user/user.model';
import { UseAuthGuard } from 'src/auth/guard/auth.guard';

@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly fileService: FileService
    ) {}

  @Get()
  @Public()
  async getAll() {
    return this.articleService.getAll();
  }

  @Get(':id')
  @Public()
  async getById(@Param('id') id: string) {
    return this.articleService.getById(id);
  }

  @Roles([USER_ROLE.ADMIN])
  @UseAuthGuard()
  @Post()
  async create(
    @Body() dto: CreateArticleDto,
    ) {
    return this.articleService.create(dto);
  }

  @Roles([USER_ROLE.ADMIN])
  @UseAuthGuard()
  @Post(':id/file')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: (req, file, callback) => {
      const ext = extname(file.originalname);
      if (ext !== ".png") {
        callback(new BadRequestException("INVALID_EXT"), false);
      } else {
        callback(null, true);
      }
    }
  }))

  async uploadFile(
    @Param("id") articleId: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return await this.articleService.linkFile(articleId, file);
  }

  @Roles([USER_ROLE.ADMIN])
  @UseAuthGuard()
  @Delete(':id/file')
  async getDefaultAutoSelectFamilyAttemptTimeout(
    @Param('id') articleId: string,
  ) {
    return await this.articleService.deleteFile(articleId);
  }

  @Roles([USER_ROLE.ADMIN])
  @UseAuthGuard()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: CreateArticleDto) {
    return this.articleService.updateById(id, dto);
  }

  @Roles([USER_ROLE.ADMIN])
  @UseAuthGuard()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }
}
