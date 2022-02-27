import { Users } from "../../generated/graphql";
import { Types } from "../types";

type AuthAction =
  | { type: Types.AUTH_CHECKING_FINISH }
  | { type: Types.AUTH_LOGIN; payload: { user: Partial<Users> } }
  | { type: Types.AUTH_LOGOUT };

export type AuthState = {
  checking: boolean;
  user?: Partial<Users>;
};

const INITIAL_STATE: AuthState = {
  checking: true,
};

export const AuthReducer = (
  state: AuthState = INITIAL_STATE,
  action: AuthAction
) => {
  switch (action.type) {
    case "AUTH_LOGIN":
      return {
        ...state,
        user: action.payload.user,
        checking: false,
      };

    case "AUTH_CHECKING_FINISH":
      return {
        ...state,
        checking: false,
      };

    case "AUTH_LOGOUT":
      return {
        checking: false,
      };

    default:
      return state;
  }
};
