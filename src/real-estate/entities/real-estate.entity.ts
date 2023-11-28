
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type RealEstateDocument = RealEstate & Document;

export enum AppartmentType {
  A = 'A',
  B = 'B',
}

export enum Stages {
  Building = 'Building',
  Finished = 'Finished',
}

export enum Type {
  villa = "villa",
  appartment = "appartment",
  land = "land"
}

@Schema({ timestamps: true })
export class RealEstate {
  @Prop({ required: true })
  title : string;

  @Prop({ required: true })
  place: string;

  @Prop({ required: true })
  bedrooms: string;

  @Prop({ required: true })
  floors: string;

  @Prop({ required: true })
  square: number;

  @Prop({ required: true })
  price: number;

  @Prop({
    enum: Object.values(AppartmentType),
    default: 'A',
  })
   appType: AppartmentType;

  @Prop({
    enum: Object.values(Type),
    default: 'Land'
  })
  type: Type

  @Prop() 
  cover: string;

  @Prop() 
  gallery: string[];

  @Prop()
  coverBlueprint: string;

  @Prop()
  blueprints: string[]

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  yearBuild: number;

  @Prop({ required: true, default: false })
  starred: boolean;

  @Prop({
    required: true,
    enum: Object.values(Stages),
    default: 'Building'
  })
  buildStage: Stages;

  @Prop()
  distanceToTheBeach: number; 
}

export const RealEstateSchema = SchemaFactory.createForClass(RealEstate);