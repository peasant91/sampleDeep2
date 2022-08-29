import { User } from "../../models/auth/Auth";

/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */

export type AuthState = {
  isAuthenticated: boolean;
  user?: User;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
};

const authReducer = (state: AuthState = initialState, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
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
