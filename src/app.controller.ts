import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private authService: AuthService
  ) {}

  //@UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    const user = {
      userName: req.body.userName,
      password: req.body.password
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('home')
  async index() {
    return await this.appService.getHomeData();
  }
}
