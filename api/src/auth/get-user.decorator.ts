import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

//this will allow as to extract the user object from the request
export const GetAdmin = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
