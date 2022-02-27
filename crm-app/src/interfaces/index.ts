import { AuthState } from "../redux/reducers/authReducer";
import { ClientState } from "../redux/reducers/clientReducer";

export interface AppState {
  AUTH: AuthState;
  CLIENT: ClientState;
}
