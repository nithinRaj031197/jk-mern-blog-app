import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

@Injectable()
export class AuthService {
  private client: OAuth2Client;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {
    this.client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    );
  }

  async validateOAuthLogin(token: string, provider: string): Promise<any> {
    try {
      if (provider === 'google') {
        const response = await axios.get(
          'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const { email, name } = response.data;

        if (!email) {
          throw new UnauthorizedException(
            'Google token validation failed: Email not found.',
          );
        }

        let user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
          user = this.userRepository.create({ email, displayName: name });
          await this.userRepository.save(user);
        }

        const jwtPayload = { id: user.id, email: user.email };
        const jwtToken = this.jwtService.sign(jwtPayload);

        return { user, token: jwtToken };
      }

      throw new UnauthorizedException('Unsupported provider.');
    } catch (error) {
      console.error('Google Token Validation Error:', error.message);
      throw new UnauthorizedException('Failed to validate Google token.');
    }
  }
}
