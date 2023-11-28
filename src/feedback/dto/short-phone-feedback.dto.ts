import { IsPhoneNumber, IsString } from "class-validator";

export class ShortPhoneFeedbackDto {
  @IsString()
  name: string;

  @IsPhoneNumber()
  phone: string;
}
