import { Module } from '@nestjs/common';
import { AuthTestService } from './auth-test.service';
import { AuthTestController } from './auth-test.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [AuthModule],
	controllers: [AuthTestController],
	providers: [AuthTestService],
	exports: [AuthTestService],
})
export class AuthTestModule {}
