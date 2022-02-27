import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";

import { Context, UserCtx } from "../types/Context";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const token = context.req.headers["authorization"]?.replace("Bearer ", "");

  if (!token) {
    throw new Error("Not authenticated");
  }
  try {
    const user = verify(token, process.env.JWT_SECRET!);
    context.req.user = user as UserCtx;
  } catch (error) {
    console.log(error);
  }

  return next();
};
