import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard, UseAuthGuard } from "src/auth/guard/auth.guard";

@UseAuthGuard()
@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    async getUser(){
        return 123
    }
}
