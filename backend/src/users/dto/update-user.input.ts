import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, {
    nullable: true,
    description: 'Email address of the user',
  })
  email?: string;

  @Field(() => String, { nullable: true, description: 'Name of the user' })
  name?: string;

  @Field(() => Int, { nullable: true, description: 'Age of the user' })
  age?: number;
}
