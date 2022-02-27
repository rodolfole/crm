import { compareSync, hashSync } from "bcrypt";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

import { Users } from "../entities";
import { LoginInput, UserInput } from "../inputs";
import { LoginResponse } from "../inputs/Login.input";
import { isAuth } from "../middlewares/isAuth";
import { createJWT } from "../utils/jwt";

@Resolver(() => Users)
export class UserResolver {
  @Query(() => [Users])
  @UseMiddleware(isAuth)
  async users() {
    return await Users.find();
  }

  @Mutation(() => Boolean, { nullable: true })
  async existUser(@Arg("email") email: string) {
    const user = await Users.findOne({ email: email.toLowerCase() });

    if (!user) return false;

    return true;
  }

  @Mutation(() => LoginResponse)
  async login(@Arg("input") { email, password }: LoginInput) {
    const user = await Users.findOne({ email });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const valid = compareSync(password, user.password);
    if (!valid) throw new Error("Invalid Credentials");

    user.password = hashSync(user.password, 10);

    return {
      jwt: createJWT(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        "1d"
      ),
    };
  }

  @Mutation(() => Users)
  async register(@Arg("input") input: UserInput) {
    const user = await Users.findOne({ email: input.email });

    if (user) {
      throw new Error("The user is already registered");
    }

    input.password = hashSync(input.password, 10);

    return await Users.create(input).save();
  }
}
