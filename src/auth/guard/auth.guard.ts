import { CanActivate, ExecutionContext, Injectable, UseGuards, applyDecorators } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService, TokenUser } from '../auth.service';
import { ALLOWED_ROLES, AUTH, IS_PUBLIC } from '../constants';
import { USER_ROLE } from 'src/user/user.model';
import { Roles } from '../decorator/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly reflector: Reflector
    ){}

    matchRoles(user: null | TokenUser, roles: USER_ROLE[]): boolean {
        return user ?
            roles.length
                ? roles.includes(user.role)
                : true
            : false
    }
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
            context.getHandler(),
            context.getClass()
        ]) || false;

        const allowedRoles = this.reflector.getAllAndOverride<USER_ROLE[]>(ALLOWED_ROLES, [
            context.getHandler(),
            context.getClass()
        ]) || [];

        const user: TokenUser | null = await this.authService.parseToken(request.cookies[AUTH]).catch(() => null);

        request.user = user;
        return isPublic || this.matchRoles(user, allowedRoles);
    }
}

export const UseAuthGuard = () => UseGuards(AuthGuard);

export const UseRolesGuard = (roles: USER_ROLE[]) => applyDecorators(
    UseGuards(AuthGuard),
    Roles(roles)
)