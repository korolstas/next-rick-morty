import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { heroesReducer } from "./heroes";
import { locationReducer } from "./location";
import { userReducer } from "./user";

const reducer = combineReducers({
  heroesReducer,
  locationReducer,
  userReducer,
});

const setupStore = () => {
  return configureStore({
    reducer,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
