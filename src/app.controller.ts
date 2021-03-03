import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //@UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    const user = {
      userName: req.body.userName,
      password: req.body.password
    }
    return this.authService.login(user);
  }
}
