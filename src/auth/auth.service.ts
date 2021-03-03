import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string) {
    let user = await this.usersService.findByName(username, pass);
    if (user && user.userName === username) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { userName: user.userName, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      payload
    };
  }
}
