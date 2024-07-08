import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String, { description: 'Title of the post' })
  title: string;

  @Field(() => String, { description: 'Content of the post' })
  content: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Published status of the post',
  })
  published?: boolean;

  @Field(() => Int, { description: 'ID of the author' })
  authorId: number;
}
