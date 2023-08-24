import { createSlice } from "@reduxjs/toolkit";
import { SearchState } from "./types";

const initialState: SearchState = {
  search: undefined,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
  },
  extraReducers: {},
});

export const { setSearch } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
