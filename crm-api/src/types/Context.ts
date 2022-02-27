import { Request, Response } from "express";

import { createUserLoader } from "../utils/createUserLoader";

export type Context = {
  req: Request & { user: UserCtx };
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
};

export type UserCtx = {
  id: number;
  email: string;
};
