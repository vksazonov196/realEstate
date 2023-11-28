import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { compare, hash } from "bcrypt"
import { USER_ROLE, User, UserDocument } from "./user.model";
import { Model, Types } from "mongoose";
import { ADMIN } from "src/config.json";
import { CreateUserDto } from "./dto/create-user.dto";
import { ERROR } from "src/constants";



@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ){
        this.ensureAdminUser();
    }

    private async ensureAdminUser(){
        try {
            await this.getByUsername(ADMIN.username);
        } catch (err) {
            await this.create({
                username: ADMIN.username,
                password: ADMIN.password,
            }, USER_ROLE.ADMIN);
        }
    }

    public format(user: UserDocument){
        return ({
            username: user.username,
            role: user.role,
            balance: user.balance
        })
    }

    public async create(dto: CreateUserDto, role: USER_ROLE = USER_ROLE.USER){
        const exists = await this.getByUsername(dto.username).catch(() => null);
        if(exists) throw new BadRequestException(ERROR.USERNAME_EXISTS)
        const newUser = await this.userModel.create({
            username: dto.username,
            password: await hash(dto.password, 10),
            role: role
        })
        return newUser;
    }

    public async getById(userId: string | Types.ObjectId){
        const user = await this.userModel.findById(userId);
        if(!user) throw new NotFoundException(ERROR.USER_NOT_FOUND);
        return user;
    }

    public async getByUsername(username: string){
        const user = await this.userModel.findOne({
            username: username
        });
        if(!user) throw new NotFoundException(ERROR.USER_NOT_FOUND);
        return user;
    }
}
