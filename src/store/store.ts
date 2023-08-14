import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice/appSlice";

const rootReducer = combineReducers({
  appSlice,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
