import { Module } from '@nestjs/common';
import { PrismaService } from 'src/util/prisma';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  providers: [PostsResolver, PostsService, PrismaService],
})
export class PostsModule {}
