import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./createdApi/baseApi";
import authReducer from "./features/auth/authSlice";
import favouriteReducer from "./features/favourite/favouriteSlice";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import storage from "./storage";

// Persist Configurations
const authPersistConfig = {
  key: "sbtv-auth",
  storage: storage,
};
// Persist Configurations
const favouritePersistConfig = {
  key: "sbtv-favourites",
  storage: storage,
};

// Persisted Reducers
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: persistReducer(authPersistConfig, authReducer),
  favourites: persistReducer(favouritePersistConfig, favouriteReducer),
});

// Configure Store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

// Persistor
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
