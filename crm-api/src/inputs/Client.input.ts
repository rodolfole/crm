import { Field, InputType } from "type-graphql";

@InputType()
export class ClientInput {
  @Field()
  email!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field({ nullable: true })
  phone!: string;
}
