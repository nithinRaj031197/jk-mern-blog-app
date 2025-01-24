import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'blog_user',
      password: process.env.DB_PASSWORD || 'blog_password',
      database: process.env.DB_NAME || 'blogdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    PostsModule,
  ],
})
export class AppModule {}
