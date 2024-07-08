import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Post {
  @Field(() => Int, { description: 'Unique identifier for the post' })
  id: number;

  @Field(() => String, { description: 'Title of the post' })
  title: string;

  @Field(() => String, { description: 'Content of the post' })
  content: string;

  @Field(() => Int, { nullable: true, description: 'Age of the post' })
  age?: number;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Published status of the post',
  })
  published?: boolean;

  @Field(() => User, { nullable: true, description: 'Author of the post' })
  author?: User;
}
