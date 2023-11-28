import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from "src/config.json";
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    JwtModule.register({
        secret: JWT.secret,
        signOptions: {
            expiresIn: JWT.expire_in
        }
    }),
    forwardRef(() => UserModule)
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
