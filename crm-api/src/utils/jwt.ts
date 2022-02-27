import { sign } from "jsonwebtoken";

export const createJWT = (payload: any, secret: string, expiresIn: string) => {
  return sign({ ...payload }, secret, { expiresIn });
};
