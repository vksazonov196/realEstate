import { ArrayNotEmpty, IsArray, IsEnum, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { AppartmentType, Stages, Type } from "../entities/real-estate.entity";

export class UpdateRealEstateDto {
  @IsString()
  title : string;

  @IsString()
  place: string;

  @IsNumber()
  bedrooms: string;

  @IsNumber()
  floors: string;

  @IsNumber()
  square: number;

  @IsNumber()
  price: number;

  @IsEnum(AppartmentType)
  appType: AppartmentType;

  @IsEnum(Type)
  type: Type;

  @IsPhoneNumber()
  phone: string;

  @IsNumber()
  yearBuild: number;

  @IsEnum(Stages)
  buildStage: Stages;

  @IsNumber()
  distanceToTheBeach: number;
}