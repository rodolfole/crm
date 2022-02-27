import { Clients } from "../../generated/graphql";
import { Types } from "../types";

type ClientAction =
  | { type: Types.CLIENT_ACTIVE; payload: { client: Clients } }
  | { type: Types.CLIENT_CLEAR_ACTIVE };

export type ClientState = {
  client: Partial<Clients>;
};

const INITIAL_STATE: ClientState = {
  client: {
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  },
};

export const ClientReducer = (
  state: ClientState = INITIAL_STATE,
  action: ClientAction
): ClientState => {
  switch (action.type) {
    case "CLIENT_ACTIVE":
      return {
        ...state,
        client: action.payload.client,
      };

    case "CLIENT_CLEAR_ACTIVE":
      return {
        ...state,
        client: INITIAL_STATE.client,
      };

    default:
      return state;
  }
};
