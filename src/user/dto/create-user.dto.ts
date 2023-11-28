import { IsString, MaxLength, MinLength } from "class-validator";
import { ERROR } from "src/constants";

export class CreateUserDto {
    @IsString()
        @MinLength(5, { message: ERROR.USERNAME_SHORT })
        @MaxLength(30, { message: ERROR.USERNAME_LONG })
    username: string

    @IsString()
        @MinLength(6, { message: ERROR.PASSWORD_SHORT })
    password: string
}