import { Controller, Get, UseGuards } from "@nestjs/common";
import { TokenUser } from "src/auth/auth.service";
import { AuthTestService } from "./auth-test.service";
import { UseAuthGuard } from "src/auth/guard/auth.guard";
import { Roles } from "src/auth/decorator/roles.decorator";
import { USER_ROLE } from "src/user/user.model";
import { User } from "src/auth/decorator/user.decorator";
import { Public } from "src/auth/decorator/public.decorator";

@UseAuthGuard()
@Controller("auth-test")
export class AuthTestController {
    constructor(
        private readonly authTestService: AuthTestService
    ) {}

    @Get("admin")
    @Roles([USER_ROLE.ADMIN])
    async testAdminOnly(
        @User() user: TokenUser
    ){
        return ({
            user: user
        })
    }

    @Get("public")
    @Public()
    async testPublic(
        @User() user: TokenUser | null
    ){
        return ({
            user: user
        })
    }

    @Get("moderator-or-admin")
    @Roles([USER_ROLE.ADMIN, USER_ROLE.MODERATOR])
    async testModeratorOrAdmin(
        @User() user: TokenUser
    ){
        return ({
            user: user
        })
    }
}
