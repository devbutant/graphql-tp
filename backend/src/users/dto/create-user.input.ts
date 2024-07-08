import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Email address of the user' })
  email: string;

  @Field(() => String, { description: 'Name of the user' })
  name: string;

  @Field(() => Int, { nullable: true, description: 'Age of the user' })
  age?: number;
}
