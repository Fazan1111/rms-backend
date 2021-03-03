import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(user: User): Promise<any> {
    const findUser = await this.authService.validateUser(user);
    if (!findUser) {
      throw new HttpException('user not found', 404);
    }
    return findUser;
  }
}
