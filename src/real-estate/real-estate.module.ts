import { Module } from '@nestjs/common';
import { RealEstateService } from './real-estate.service';
import { RealEstateController } from './real-estate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RealEstate, RealEstateSchema } from './entities/real-estate.entity';
import { FileService } from 'src/file/file.service';
import { FileModule } from 'src/file/file.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RealEstateController],
  providers: [RealEstateService],
  imports: [
    MongooseModule.forFeature([{ name: RealEstate.name, schema: RealEstateSchema }]),
    FileModule,
    AuthModule,
  ]
})
export class RealEstateModule {}
