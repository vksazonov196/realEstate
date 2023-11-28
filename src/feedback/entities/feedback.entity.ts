import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type FeedbackDocument = Feedback & Document;

@Schema({ timestamps: true })
export class Feedback {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string; 

  @Prop()
  content: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
