import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Post } from '../posts/entities/post.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async seedDatabase() {
    const users: any = [];
    for (let i = 0; i < 100; i++) {
      const user = this.userRepository.create({
        email: `user${i}@example.com`,
        displayName: `User ${i}`,
      });
      users.push(await this.userRepository.save(user));
    }

    for (const user of users) {
      for (let j = 0; j < 10; j++) {
        const post = this.postRepository.create({
          title: `Post ${j} by ${user.displayName}`,
          body: 'This is a seeded post.',
          userId: user.id,
        });
        await this.postRepository.save(post);
      }
    }

    return 'Database seeded successfully';
  }
}
