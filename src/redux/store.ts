import { searchReducer } from '@redux/search';
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({
  searchReducer,
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
