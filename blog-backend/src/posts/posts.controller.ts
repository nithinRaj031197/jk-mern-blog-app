import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts() {
    return this.postsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @Request() req: any) {
    const userId = req.user.id;
    return this.postsService.create({ ...createPostDto, userId });
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: CreatePostDto,
    @Request() req: any,
  ) {
    const userId = req.user.id;
    return this.postsService.update(id, { ...updatePostDto, userId });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.id;
    return this.postsService.delete(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('bulk')
  async createBulkPosts(
    @Body() createPostDtos: CreatePostDto[],
    @Request() req: any,
  ) {
    const userId = req.user.id;
    return this.postsService.createBulk(createPostDtos, userId);
  }
}
