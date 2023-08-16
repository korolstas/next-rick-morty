import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";


const reducer = combineReducers({ appSlice });

const setupStore = () => {
  return configureStore({
    reducer,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

