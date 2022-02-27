import { Clients } from "../../generated/graphql";
import { Types } from "../types";

const clientActive = (client: Clients) => ({
  type: Types.CLIENT_ACTIVE,
  payload: { client },
});

const clientClearActive = () => ({
  type: Types.CLIENT_CLEAR_ACTIVE,
});

export { clientActive, clientClearActive };
