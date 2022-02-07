import { JwtModule } from '@nestjs/jwt';
import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from './../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '24h',
      }
    })
  ],
  exports: [
    AuthService, JwtModule
  ]
})
export class AuthModule {}
