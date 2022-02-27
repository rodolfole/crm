import jwtDecode from "jwt-decode";

export const JWTDecode = (token: string) => jwtDecode(token);
