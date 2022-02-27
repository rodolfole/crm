import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";

import { Clients, Users } from "../entities";
import { ClientInput } from "../inputs";
import { isAuth } from "../middlewares/isAuth";
import { Context } from "../types/Context";

@Resolver(() => Clients)
export class ClientResolver {
  @FieldResolver(() => Users)
  seller(@Root() client: Clients, @Ctx() { userLoader }: Context) {
    return userLoader.load(client.sellerId);
  }

  @Query(() => Clients)
  @UseMiddleware(isAuth)
  async client(@Arg("id", () => Int) id: number, @Ctx() { req }: Context) {
    const client = await Clients.findOne({ id });

    if (!client) throw new Error("Client does not exist");

    if (client.sellerId !== req.user.id)
      throw new Error("You don't have the credentials");

    return client;
  }

  @Query(() => [Clients])
  async clients() {
    return await Clients.find();
  }

  @Query(() => [Clients])
  @UseMiddleware(isAuth)
  async clientsSeller(
    @Arg("limit", () => Int, { nullable: true }) limit: number | null,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: Context
  ) {
    return await Clients.find({ where: { sellerId: req.user.id } });
  }

  @Mutation(() => Clients)
  @UseMiddleware(isAuth)
  async createClient(
    @Arg("input") input: ClientInput,
    @Ctx() { req }: Context
  ) {
    const client = await Clients.findOne({ email: input.email });

    if (client) throw new Error("The client is already registered");

    try {
      return await Clients.create({ ...input, sellerId: req.user.id }).save();
    } catch (error) {
      console.log("Error - createClient: ", error);
    }
  }

  @Mutation(() => Int)
  @UseMiddleware(isAuth)
  async deleteClient(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: Context
  ) {
    const client = await Clients.findOne({ id });

    if (!client) throw new Error("Client does not exist");

    if (client.sellerId !== req.user.id)
      throw new Error("You don't have the credentials");

    try {
      await Clients.delete({ id, sellerId: req.user.id });

      return id;
    } catch (error) {
      console.log("Error - deleteClient: ", error);
    }
  }

  @Mutation(() => Clients)
  @UseMiddleware(isAuth)
  async updateClient(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: ClientInput,
    @Ctx() { req }: Context
  ) {
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .update(Clients)
        .set({ ...input })
        .where('id = :id and "sellerId" = :sellerId', {
          id,
          sellerId: req.user.id,
        })
        .returning("*")
        .execute();

      return result.raw[0];
    } catch (error) {
      console.log("Error - updateClient: ", error);
    }
  }
}
