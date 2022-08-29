/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "../reducers/authReducer";
import { combineReducers, createStore } from "redux";
import { mapReducer } from "../reducers/mapReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

export const rootReducer = combineReducers({
  authReducer: persistReducer(persistConfig, authReducer),
  mapReducer: persistReducer(persistConfig, mapReducer),
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
