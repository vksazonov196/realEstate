import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { USER_ROLE, UserDocument } from "src/user/user.model";
import { UserService } from "src/user/user.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { compare } from "bcrypt";
import { ERROR } from "src/constants";

export interface TokenUser {
    id: string
    role: USER_ROLE
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    public async login(dto: LoginDto){
        const user = await this.userService.getByUsername(dto.username);
        if(!await compare(dto.password, user.password)) throw new ForbiddenException(ERROR.INVALID_AUTH);

        return ({
            user: this.userService.format(user),
            token: await this.generateToken(user)
        })
    }

    public async register(dto: RegisterDto){
        const user = await this.userService.create(dto, USER_ROLE.MODERATOR);

        return ({
            user: this.userService.format(user),
            token: await this.generateToken(user)
        })
    }

    public async generateToken(user: UserDocument){
        return await this.jwtService.signAsync({
            id: String(user._id),
            role: user.role
        })
    }

    public async parseToken(token: string): Promise<TokenUser> {
        const tokenUser = await this.jwtService.verifyAsync<TokenUser>(token);
        return ({
            id: tokenUser.id,
            role: tokenUser.role
        })
    }
}
