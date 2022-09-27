import { print } from "@gorhom/bottom-sheet/lib/typescript/utilities/logger";
import { completeHandlerIOS } from "react-native-fs";
import { User } from "../../models/auth/Auth";

/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */

export type AuthState = {
  isAuthenticated: boolean;
  isPM: boolean;
  isHeadAdmin: boolean;
  user?: User;
};

const initialState: AuthState = {
  isAuthenticated: false,
  isPM: false,
  isHeadAdmin: false,
  user: undefined,
};

const authReducer = (state: AuthState = initialState, action: any) => {
  switch (action.type) {
    case "LOGINPM":
      return {
        ...state,
        isAuthenticated: true,
        isPM: true,
        isHeadAdmin: false,
        user: action.payload.user,
      };

    case "LOGINADMIN":
      return {
        ...state,
        isAuthenticated: true,
        isHeadAdmin: true,
        isPM: false,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        isHeadAdmin: false,
        isPM: false,
        user: undefined,
      };
    case "INITIALIZE":
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
      };
    default:
      return state;
  }
};
export default authReducer;
