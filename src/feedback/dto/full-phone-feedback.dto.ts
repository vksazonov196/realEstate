import { IsPhoneNumber, IsString } from "class-validator";


export class FullPhoneFeedbackDto {
  @IsString()
  name: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  content: string;
}
