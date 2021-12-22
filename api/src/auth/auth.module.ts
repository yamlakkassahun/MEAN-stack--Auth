import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    //this will allows as to use passport package
    PassportModule.register({ defaultStrategy: 'jwt' }),
    //this will allows us to sign token and sign when it will expired
    JwtModule.register({
      secret:
        'CyCM+wgUP6nS0jLkXJK9rmGv5hs8atD27fE9CQUiyjfcvyvbI5rdFFnEi6gJAbbaGnax6mKUWUH/RWI+Cb0nFjuH3k2fyEj8igFXrmDrRpIHDvyCdj2Ws9B2hyYWSWUt+3xUn0OCvLmxg3VSVN5rQIbLXLoVDluxQFDNEOm7Tm3fPCmF5SaynTT2h+iBoyHt0n+WRywYoQfAlX7S7TWmQ8AI0nQS8Esgj1452dbrd2j8pwZiYe5pPconXIr1eCWkNqc1sORdUR22dzryZTkwgpYICwYYeePSp0xO3BDpvEdvxqKtImERq9on0hIzlWrJZ5RmzuZI/Rc/fKtw300u3A',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
