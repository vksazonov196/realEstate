import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRealEstateDto } from './dto/create-real-estate.dto';
import { UpdateRealEstateDto } from './dto/update-real-estate.dto';
import { RealEstate, RealEstateDocument } from './entities/real-estate.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { FileService } from 'src/file/file.service';

@Injectable()
export class RealEstateService {
constructor(
  @InjectModel(RealEstate.name) private realEstateModel: Model<RealEstateDocument>,
  private readonly fileService: FileService,
) {}
  async getAll(): Promise<RealEstateDocument[]> {
    return await this.realEstateModel.find().exec();
  }

  async getById(id: string): Promise<RealEstateDocument> {
    const estate = await this.realEstateModel.findById(id)
    if (!estate) {
      throw new NotFoundException();
    }
    return estate;
  }

  async getFiltered(
    minSquare?: number,
    maxSquare?: number,
    minPrice?: number,
    maxPrice?: number,
    bedrooms?: string[],
    floors?: string[],
    type?: string[],
    offset?: number,
    limit?: number 
  ): Promise<RealEstateDocument[]> {
    let query = this.realEstateModel.find();
  
    if (minSquare && maxSquare) {
      query = query.where('square').gte(minSquare).lte(maxSquare);
    } else if (minSquare) {
      query = query.where('square').gte(minSquare);
    } else if (maxSquare) {
      query = query.where('square').lte(maxSquare);
    }
  
    if (minPrice && maxPrice) {
      query = query.where('price').gte(minPrice).lte(maxPrice);
    } else if (minPrice) {
      query = query.where('price').gte(minPrice);
    } else if (maxPrice) {
      query = query.where('price').lte(maxPrice);
    }
  
    if (bedrooms) {
      query = query.where('bedrooms').in(bedrooms);
    }
  
    if (floors) {
      query = query.where('floors').in(floors);
    }

    if(type) {
      query = query.where('type').in(type);
    }

    if (offset && limit) {
      query = query.skip(offset).limit(limit);
    }
  
    return await query.exec();
  }

  async create(dto: CreateRealEstateDto): Promise<RealEstateDocument> {
    const newEstate = new this.realEstateModel({
      title: dto.title,
      place: dto.place,
      bedrooms: dto.bedrooms,
      floors: dto.floors,
      square: dto.square,
      price: dto.price,
      phone: dto.phone,
      type: dto.type,
      yearBuild: dto.yearBuild,
      buildStage: dto.buildStage
    })

    await newEstate.save()

    return newEstate;
  }

  async toggleFavourites(id: string): Promise<RealEstateDocument> {
    const estate = await this.realEstateModel.findById(id)
    estate.starred = !estate.starred;

    await estate.save()

    return estate;
  }

  async update(id: string, dto: UpdateRealEstateDto) {
    const estate = await this.realEstateModel.findById(id)
    if (!estate) {
      throw new NotFoundException();
    }

    return await this.realEstateModel.findByIdAndUpdate(
      id,
      { $set: dto},
      { new: true },
    );
  }

  async remove(id: string) {
    const estate = await this.realEstateModel.findById(id)
    if (!estate) {
      throw new NotFoundException();
    }
    return await this.realEstateModel.findByIdAndRemove(id);
  }

  async uploadToGallery(estateId: string, file: Express.Multer.File) {
    const estate = await this.realEstateModel.findById(estateId);
    const fileId = uuidv4();
    const fileKey = `estate/${fileId}.png`;
    await this.fileService.upload(fileKey, file.buffer);
    estate.gallery.push(fileKey);
    return await estate.save();
  }

  async deleteFromGallery(estateId: string, filename: string) {
    const estate = await this.realEstateModel.findById(estateId);
    const file = estate.gallery.find((image) => image === filename)
    if (!file) {
      throw new NotFoundException("File not found")
    }
    await this.fileService.delete(file);
    estate.gallery = estate.gallery.filter((image) => image !== file);

    return await estate.save()
  }

  async uploadToBlueprints(estateId: string, file: Express.Multer.File) {
    const estate = await this.realEstateModel.findById(estateId);
    const fileId = uuidv4();
    const fileKey = `estate/${fileId}.png`;
    await this.fileService.upload(fileKey, file.buffer);
    estate.blueprints.push(fileKey);
    return await estate.save();
  }

  async deleteFromBlueprints(estateId: string, filename: string) {
    const estate = await this.realEstateModel.findById(estateId);
    const file = estate.blueprints.find((blueprint) => blueprint === filename)
    if (!file) {
      throw new NotFoundException("File not found")
    }
    await this.fileService.delete(file);
    estate.blueprints = estate.blueprints.filter((blueprint) => blueprint !== file);

    return await estate.save()
  }

  async uploadCover(estateId: string, file: Express.Multer.File) {
    const estate = await this.realEstateModel.findById(estateId);
    const fileId = uuidv4();
    const fileKey = `estate/${fileId}.png`;
    await this.fileService.upload(fileKey, file.buffer);
    estate.cover = fileKey
    return await estate.save();
  }

  async deleteCover(estateId: string) {
    const estate = await this.realEstateModel.findById(estateId);
    await this.fileService.delete(estate.cover);
    estate.cover = null;

    return await estate.save()
  }

  async uploadCoverBlueprint(estateId: string, file: Express.Multer.File) {
    const estate = await this.realEstateModel.findById(estateId);
    const fileId = uuidv4();
    const fileKey = `estate/${fileId}.png`;
    await this.fileService.upload(fileKey, file.buffer);
    estate.coverBlueprint = fileKey
    return await estate.save();
  }

  async deleteCoverBlueprint(estateId: string) {
    const estate = await this.realEstateModel.findById(estateId);
    await this.fileService.delete(estate.coverBlueprint);
    estate.coverBlueprint = null;

    return await estate.save()
  }
}
