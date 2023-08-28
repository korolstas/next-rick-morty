import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { HeroesState } from "./types";
import { loadHeroes } from "./actions";

const initialState: HeroesState = {
  modalType: "",
  modalData: null,
  endPage: 0,
  heroes: [],
  isLoading: false,
  error: null,

  // search
  prevSearch: null,
  search: "",

  // PopUpWindow

  windowError: [],
  windowSuccess: [],
};

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    clearState: (state) => {
      state.modalData = null;
      state.modalType = "";
      state.heroes = [];
      state.endPage = 0;
      state.search = "";
    },
    loading: (state) => {
      state.isLoading = true;
    },
    showModal: (state, { payload }) => {
      if (state.modalType) {
        state.modalType = "";
      } else {
        if (payload.modalType === "heroModal") {
          state.modalData = payload.hero || null;
        }
        state.modalType = payload.modalType;
      }
    },
    clearError: (state) => {
      state.error = null;
    },

    // Search
    clearInputValue: (state) => {
      state.search = "";
    },
    clearSearch: (state) => {
      state.heroes = [];
      state.endPage = 1;
      if (state.error) state.error = null;
    },
    addSearch: (state, { payload }) => {
      state.search = payload;
    },

    // PopUpWindow

    setWindowSuccess: (state, { payload }) => {
      state.windowSuccess.push(payload);
    },
    setWindowError: (state, action) => {
      if (typeof action.payload.code === "string")
        state.windowError.push(action.payload.code);
      if (typeof action.payload === "string")
        state.windowError.push(action.payload);
    },
    deletePopUpInfo: (state) => {
      state.windowError = [];
      state.windowSuccess = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadHeroes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadHeroes.fulfilled, (state, action: PayloadAction<any>) => {
        const result = action.payload;
        state.heroes = [...state.heroes, ...result.results];
        state.endPage = result.info.pages;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(loadHeroes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearSearch,
  clearInputValue,
  addSearch,
  setWindowSuccess,
  setWindowError,
  deletePopUpInfo,
  loading,
  clearError,
  clearState,
  showModal,
} = heroesSlice.actions;

export const heroesReducer = heroesSlice.reducer;
