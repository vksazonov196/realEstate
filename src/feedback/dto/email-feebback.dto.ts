import { IsEmail } from "class-validator";

export class EmailFeedbackDto {
  @IsEmail()
  email: string;
}
