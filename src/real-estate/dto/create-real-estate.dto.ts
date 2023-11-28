import { ArrayNotEmpty, IsArray, IsEnum, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { AppartmentType, Stages, Type } from "../entities/real-estate.entity";

export class CreateRealEstateDto {
  @IsString()
  title : string;

  @IsString()
  place: string;

  @IsString()
  bedrooms: string;

  @IsString()
  floors: string;

  @IsNumber()
  square: number;

  @IsNumber()
  price: number;

  @IsPhoneNumber()
  phone: string;

  @IsNumber()
  yearBuild: number;

  @IsEnum(Type)
  type: Type;

  @IsEnum(Stages)
  buildStage: Stages;
}
