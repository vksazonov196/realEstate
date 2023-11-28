import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string; 

  @Prop()
  image: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);


