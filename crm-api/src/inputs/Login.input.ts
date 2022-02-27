import { InputType, Field, ObjectType } from "type-graphql";

@InputType()
export class LoginInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@ObjectType()
export class LoginResponse {
  @Field()
  jwt!: string;
}
