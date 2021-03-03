import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(user: User) {
    let currentUser = await this.usersService.findByName(user);
    if (user && currentUser.userName === user.userName) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { userName: user.userName, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      payload
    };
  }
}
