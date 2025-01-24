import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: `environment/${process.env.NODE_ENV || 'development'}.env`,
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
