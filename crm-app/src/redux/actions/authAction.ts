import { Dispatch } from "redux";

import { Users } from "../../generated/graphql";
import { Types } from "../types";
import { JWTDecode } from "../../utils/jwt";
import { getStorage } from "../../utils/storage";

const authLogin = (user: Partial<Users>) => ({
  type: Types.AUTH_LOGIN,
  payload: { user },
});

const authCheckingFinish = () => ({ type: Types.AUTH_CHECKING_FINISH });

const authLogout = () => ({ type: Types.AUTH_LOGOUT });

const authStartChecking = () => {
  return async (dispatch: Dispatch) => {
    if (getStorage("token")) {
      dispatch(authLogin(JWTDecode(getStorage("token")!) as Partial<Users>));
    } else {
      dispatch(authCheckingFinish());
    }
  };
};

const authStartLogout = () => {
  return (dispatch: Dispatch) => {
    localStorage.clear();
    dispatch(authLogout());
  };
};

export { authLogin, authStartChecking, authStartLogout };
