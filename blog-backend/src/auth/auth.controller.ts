import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google')
  async googleLogin(@Body('token') token: string) {
    const user = await this.authService.validateOAuthLogin(token, 'google');
    return { user };
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req, @Res() res) {
    const token = await this.authService.validateOAuthLogin(req.user, 'google');
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }

  @Post('facebook')
  async facebookLogin(@Body('token') token: string) {
    console.log('Received Facebook Token:', token);
    const user = await this.authService.validateOAuthLogin(token, 'facebook');
    return { user };
  }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookCallback(@Req() req, @Res() res) {
    const token = await this.authService.validateOAuthLogin(
      req.user,
      'facebook',
    );
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
}
