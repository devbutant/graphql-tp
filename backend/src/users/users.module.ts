import { Module } from '@nestjs/common';
import { PrismaService } from 'src/util/prisma';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersService, PrismaService],
})
export class UsersModule {}
