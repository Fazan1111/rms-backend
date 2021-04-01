import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';

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
    const payload = { userName: user.userName, password: user.password };
    const findUser = await this.usersService.findByName(user.userName, user.passport);
    if (findUser) {
      const mathPassword = await bcrypt.compare(user.password, findUser.password);
      if (mathPassword) {
        delete findUser.password;
        delete findUser.createdAt;
        delete findUser.updatedAt;
        delete findUser.apiToken;
        return {
          access_token: this.jwtService.sign(payload),
          findUser
        };
      } else {
        throw new HttpException('Incorrect username or password', 404);
      }
    } else {
      return new HttpException('user doses not exist', 404);
    }
    
  }
}
