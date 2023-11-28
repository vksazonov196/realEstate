import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { RealEstateService } from './real-estate.service';
import { CreateRealEstateDto } from './dto/create-real-estate.dto';
import { UpdateRealEstateDto } from './dto/update-real-estate.dto';
import { Public } from 'src/auth/decorator/public.decorator';
import { RealEstateDocument } from './entities/real-estate.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { USER_ROLE } from 'src/user/user.model';
import { UseAuthGuard } from 'src/auth/guard/auth.guard';

@Controller('real-estate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Get()
  @Public()
  findAll() {
    return this.realEstateService.getAll();
  }

  @Get('filter')
  @Public()
  async getFiltered(
    @Query('minSquare') minSquare?: number,
    @Query('maxSquare') maxSquare?: number,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('bedrooms') bedrooms?: string[],
    @Query('floors') floors?: string[],
    @Query('type') type?: string[],
    @Query('offset') offset?: number,
  @Query('limit') limit?: number 
  ): Promise<RealEstateDocument[]> {
      return this.realEstateService.getFiltered(
        minSquare, 
        maxSquare, 
        minPrice, 
        maxPrice, 
        bedrooms, 
        floors,
        type,
        offset,
        limit
      )
    }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.realEstateService.getById(id);
  }

  @Patch(':id/like')
  @Public()
  toggleFavourites(@Param('id') id: string) {
    return this.realEstateService.toggleFavourites(id);
  }

  @Roles([USER_ROLE.ADMIN])
  @UseAuthGuard()
  @Post()
  create(@Body() dto: CreateRealEstateDto) {
    return this.realEstateService.create(dto);
  }

  @Roles([USER_ROLE.ADMIN])
  @UseAuthGuard()
  @Post(':id/file/gallery')
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

  async uploadToGallery(
    @Param("id") estateId: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return await this.realEstateService.uploadToGallery(estateId, file);
  }

  @Roles([USER_ROLE.ADMIN])
  @UseAuthGuard()
  @Delete(':id/file/gallery')
  async deleteFromGallery(
    @Param('id') estateId: string,
    @Body('filename') filename: string
  ) {
    return await this.realEstateService.deleteFromGallery(estateId, filename);
  }

  @Roles([USER_ROLE.ADMIN])
  @UseAuthGuard()
  @Post(':id/file/cover')
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

  async uploadCover(
    @Param("id") estateId: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return await this.realEstateService.uploadCover(estateId, file);
  }

  @Roles([USER_ROLE.ADMIN])
  @UseAuthGuard()
  @Delete(':id/file/cover')
  async deleteCover(
    @Param("id") estateId: string,
  ) {
    return await this.realEstateService.deleteCover(estateId);
  }

  @Roles([USER_ROLE.ADMIN])
  @UseAuthGuard()
  @Post(':id/file/blueprints')
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

  async uploadToBlueprints(
    @Param("id") estateId: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return await this.realEstateService.uploadToBlueprints(estateId, file);
  }

  @Roles([USER_ROLE.ADMIN])
  @UseAuthGuard()
  @Delete(':id/file/blueprints')
  async deleteFromBlueprints(
    @Param('id') estateId: string,
    @Body('filename') filename: string
  ) {
    return await this.realEstateService.deleteFromBlueprints(estateId, filename);
  }

  @Roles([USER_ROLE.ADMIN])
  @UseAuthGuard()
  @Post(':id/file/blueprint-cover')
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

  async uploadCoverBlueprint(
    @Param("id") estateId: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return await this.realEstateService.uploadCoverBlueprint(estateId, file);
  }

  @Roles([USER_ROLE.ADMIN])
  @UseAuthGuard()
  @Delete(':id/file/blueprint-cover')
  async deleteCoverBlueprint(
    @Param("id") estateId: string,
  ) {
    return await this.realEstateService.deleteCoverBlueprint(estateId);
  }

  @Roles([USER_ROLE.ADMIN])
  @UseAuthGuard()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRealEstateDto) {
    return this.realEstateService.update(id, dto);
  }

  @Roles([USER_ROLE.ADMIN])
  @UseAuthGuard()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realEstateService.remove(id);
  }
}
