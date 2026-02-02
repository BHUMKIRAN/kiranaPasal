import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/slice/counterslice";
import lengthReducer from "../lib/features/box/boxSlice";
import userReducer from "../lib/features/user/user";

import {
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// 1️⃣ Combine reducers correctly
const rootReducer = combineReducers({
  counter: counterReducer,
  length: lengthReducer,
  user: userReducer,
});

// 2️⃣ Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // optional (persist only what you want)
};

// 3️⃣ Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4️⃣ Configure store (Redux Toolkit way ✅)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// 5️⃣ Persistor
export const persistor = persistStore(store);

// 6️⃣ Types (VERY IMPORTANT for TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
