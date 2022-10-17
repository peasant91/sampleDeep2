/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { createContext, useContext, useState } from "react";
import { LoginResponse, User } from "../models/auth/Auth";
import useBaseService from "../services/useBaseService";
import { useBottomSheet } from "../../tmd/providers/BottomSheetProvider";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKey from "../utils/StorageKey";
import { getAPI } from "../services/baseService";

export type AuthContextType = {
  login: (credential: string, password: string) => void;
  logout: () => void;
  isLoadingLogin: boolean;
  isLoadingLogout: boolean;
  isAuthenticated: boolean;
  isPM: boolean;
  isHeadAdmin: boolean;
  user?: User
}
const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: any) => {
  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);
  const isPM = useSelector(state => state.authReducer.isPM);
  const isHeadAdmin = useSelector(state => state.authReducer.isHeadAdmin);
  const user = useSelector(state => state.authReducer.user);

  const dispatch = useDispatch();
  const { postAPI } = useBaseService();
  const { showErrorBS } = useBottomSheet();
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);

  const login = async (credential: string, password: string) => {
    try {
      setIsLoadingLogin(true);
      const res = await postAPI<LoginResponse>("user/login", {
        credential, password,
      });
      await AsyncStorage.setItem(StorageKey.ACCESS_TOKEN, res.data.access_token);
      if (res.data.role == "head_admin") {
        dispatch({
          type: "LOGINADMIN",
          payload: {
            user: res.data,
          },
        });
      } else {
        dispatch({
          type: "LOGINPM",
          payload: {
            user: res.data,
          },
        });
      }
      setIsLoadingLogin(false);
    } catch (e) {
      setIsLoadingLogin(false)
      throw(e)
      showErrorBS(e);
      setIsLoadingLogin(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoadingLogout(true);
      await postAPI("user/logout");
      await AsyncStorage.setItem(StorageKey.ACCESS_TOKEN, "");
      await AsyncStorage.setItem(StorageKey.PROJECT_DATA, "");
      dispatch({
        type: "LOGOUT",
      });
      setIsLoadingLogout(false);
    } catch (e) {
      console.log(JSON.stringify(e, null, 2));
      setIsLoadingLogout(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoadingLogin,
        isLoadingLogout,
        isAuthenticated,
        isPM,
        isHeadAdmin,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Auth context must be use inside AuthProvider");
  return context;
};

export default AuthProvider;
