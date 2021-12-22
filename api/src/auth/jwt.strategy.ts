import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt.payload.interface';
import { User } from './user.entity';
import { UsersRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      secretOrKey:
        'CyCM+wgUP6nS0jLkXJK9rmGv5hs8atD27fE9CQUiyjfcvyvbI5rdFFnEi6gJAbbaGnax6mKUWUH/RWI+Cb0nFjuH3k2fyEj8igFXrmDrRpIHDvyCdj2Ws9B2hyYWSWUt+3xUn0OCvLmxg3VSVN5rQIbLXLoVDluxQFDNEOm7Tm3fPCmF5SaynTT2h+iBoyHt0n+WRywYoQfAlX7S7TWmQ8AI0nQS8Esgj1452dbrd2j8pwZiYe5pPconXIr1eCWkNqc1sORdUR22dzryZTkwgpYICwYYeePSp0xO3BDpvEdvxqKtImERq9on0hIzlWrJZ5RmzuZI/Rc/fKtw300u3A',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user: User = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }
    //than passport will eject the user in the request header so we allways have access to it
    return user;
  }
}
