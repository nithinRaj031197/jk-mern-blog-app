import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async findAll() {
    return this.postRepository.find({ relations: ['user'] });
  }

  async findOne(id: string) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found.`);
    }
    return post;
  }

  async update(id: string, updatePostDto: CreatePostDto) {
    const post = await this.findOne(id);
    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async delete(id: string, userId: string) {
    const post = await this.postRepository.findOne({ where: { id, userId } });
    if (!post) {
      throw new NotFoundException(
        `Post with ID ${id} not found or unauthorized.`,
      );
    }
    return this.postRepository.remove(post);
  }

  async createBulk(createPostDtos: CreatePostDto[], userId: string) {
    const posts = createPostDtos.map((dto) => ({
      ...dto,
      userId,
    }));
    return this.postRepository.save(posts);
  }
}
