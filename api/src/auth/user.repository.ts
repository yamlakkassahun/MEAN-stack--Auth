import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto): Promise<User> {
    const { email, password } = authCredentialDto;

    //genrat the salt to hash password
    const salt = await bcrypt.genSalt();
    //
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      salt: salt,
      email: email,
      password: hashPassword,
    });

    try {
      await this.save(user);
      return user;
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('Email Already Exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
