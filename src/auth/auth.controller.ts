import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService, TokenUser } from 'src/auth/auth.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { AUTH } from './constants';
import { RegisterDto } from './dto/register.dto';
import { UseAuthGuard } from './guard/auth.guard';
import { User } from './decorator/user.decorator';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('/')
	@UseAuthGuard()
	async current(@User() user: TokenUser) {
		return {
			user: user,
		};
	}

	@Post('login')
	async login(@Body() dto: LoginDto, @Res() response: Response) {
		const { user, token } = await this.authService.login(dto);
		response.cookie(AUTH, token).json({ user });
	}

	@Post('register')
	async register(@Body() dto: RegisterDto, @Res() response: Response) {
		const { user, token } = await this.authService.register(dto);
		response.cookie(AUTH, token).json({ user });
	}

	@Post('logout')
	@UseAuthGuard()
	async logout(@Res() response: Response) {
		return response.clearCookie(AUTH).sendStatus(200);
	}
}
