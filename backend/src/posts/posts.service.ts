import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/util/prisma';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPostInput: CreatePostInput) {
    // return this.prisma.post.create({
    //   data: createPostInput,
    // });
    const { authorId, ...data } = createPostInput;
    return this.prisma.post.create({
      data: {
        ...data,
        author: {
          connect: { id: authorId },
        },
      },
      include: {
        author: true,
      },
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      include: {
        author: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return this.prisma.post.update({
      where: { id },
      data: updatePostInput,
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
