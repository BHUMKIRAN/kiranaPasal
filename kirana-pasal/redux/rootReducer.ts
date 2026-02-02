import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import counterReducer from "./slices/counterSlice"
import lengthReducer from "../lib/features/box/boxSlice"
import userReducer from "../lib/features/user/user"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"], // 👈 only these persist
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  counter: counterReducer,
  length: lengthReducer,
  user: userReducer,
});

export const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);
