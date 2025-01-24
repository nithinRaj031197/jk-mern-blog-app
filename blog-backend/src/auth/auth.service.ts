import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateOAuthLogin(user: any, provider: string): Promise<string> {
    let existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (!existingUser) {
      existingUser = this.userRepository.create({
        email: user.email,
        displayName: user.displayName,
        [`${provider}Id`]: user[`${provider}Id`],
      });
      await this.userRepository.save(existingUser);
    }

    const payload = { id: existingUser.id, email: existingUser.email };
    return this.jwtService.sign(payload);
  }
}
