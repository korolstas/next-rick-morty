import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAllHeroes, IHeroes } from "../../types/redux-interfaces";
import {
  favoritesLoad,
  loadHeroes,
  locationHeroes,
  requestLocation,
  soartedHeroes,
} from "./ActionCreators";

type IHeroesState = {
  modalType: string;
  modalData: any; //change any
  isLoadedData: boolean;
  nextPage: string | null;
  heroes: IHeroes[];
  isLoading: boolean;

  // search

  nextPageSort: string | null;
  isSearchData: boolean;
  sortHeroes: IHeroes[];
  error: string | null;
  prevSearch: string;
  search: string;

  // PopUpWindow

  windowError: string[];
  windowSuccess: string[];

  // location

  urlLocation: string;
  urlHeroArray: string[];
  localHeroes: IHeroes[];

  //user

  id: string | undefined;
  isUser: boolean;
  isFavorite: boolean;
  name: string;
  image: string | undefined;
  arrFavoriteHeroes: number[];
  favoriteHeroes: IHeroes[];
};

const initialState: IHeroesState = {
  modalType: "",
  modalData: null,
  isLoadedData: false,
  isSearchData: false,
  nextPage: "",
  heroes: [],
  isLoading: true,
  error: null,

  // search

  nextPageSort: null,
  sortHeroes: [],
  prevSearch: "",
  search: "",
  windowError: [],
  windowSuccess: [],

  // location

  urlLocation: "",
  localHeroes: [],
  urlHeroArray: [],

  // user

  id: undefined,
  isUser: false,
  isFavorite: false,
  name: "",
  image: undefined,
  arrFavoriteHeroes: [],
  favoriteHeroes: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isSearchData = false;
      state.modalData = null;
      state.isLoadedData = false;
      state.modalType = "";
      state.isLoading = true;
      state.nextPageSort = null;
      state.sortHeroes = [];
      state.prevSearch = "";
      state.search = "";
      state.localHeroes = [];
      state.urlHeroArray = [];
    },
    loadedMarkerTrue: (state) => {
      state.isLoadedData = true;
    },
    loadedMarkerFalse: (state) => {
      state.isLoadedData = false;
      state.isLoading = false;
    },
    loading: (state) => {
      state.isLoading = true;
    },
    showModal: (state, { payload }) => {
      if (state.modalType === "") {
        state.modalType = payload.modalType;
        payload.hero ? (state.modalData = payload.hero) : null;
      } else {
        state.modalType = "";
      }
    },
    clearError: (state) => {
      state.error = null;
    },

    // Search

    searcher: (state, action) => {
      state.search = action.payload;
      if (state.search !== state.prevSearch) {
        state.nextPageSort = "";
        state.sortHeroes = [];
      }
      if (action.payload !== "") {
        state.isLoadedData = true;
      } else {
        state.nextPageSort = "";
        state.sortHeroes = [];
        state.isLoadedData = false;
      }
      state.prevSearch = state.search;
    },

    // PopUpWindow

    setWindowSuccess: (state, { payload }) => {
      state.windowSuccess.push(payload);
    },
    setWindowError: (state, action) => {
      state.windowError.push(action.payload.code);
    },
    deletePopUpInfo: (state) => {
      state.windowError = [];
      state.windowSuccess = [];
    },

    // location

    postLocation: (state, action) => {
      state.urlLocation = action.payload;
    },

    // User

    setUser: (state, { payload }) => {
      state.isUser = true;
      if (payload.id) {
        state.id = payload.id;
      }
      if (payload.name) {
        state.name = payload.name;
      }
      if (payload.image) {
        state.image = payload.image;
      }
    },
    loadFavoritesHeroes: (state, { payload }) => {
      state.arrFavoriteHeroes = payload.favorites;
    },
    addFavoriteHero: (state, { payload }) => {
      state.arrFavoriteHeroes = state.arrFavoriteHeroes.concat(payload.id);
      state.favoriteHeroes = state.favoriteHeroes.concat(payload);
    },
    onClickBtnFavorite: (state, { payload }) => {
      state.isFavorite = payload;
    },
    deleteFavorite: (state, { payload }) => {
      const index = state.arrFavoriteHeroes.indexOf(payload);
      state.arrFavoriteHeroes.splice(index, 1);
      if (state.favoriteHeroes.length !== 0) {
        state.favoriteHeroes = state.favoriteHeroes.filter((hero) => {
          return payload !== hero.id;
        });
      }
    },
    clearPage: (state) => {
      state.isFavorite = false;
      state.favoriteHeroes = [];
    },
    exit: (state) => {
      state.id = undefined;
      state.isUser = false;
      state.isFavorite = false;
      state.name = "";
      state.image = undefined;
      state.arrFavoriteHeroes = [];
      state.favoriteHeroes = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // Home

      .addCase(loadHeroes.pending, (state) => {
        if (!state.heroes) state.isLoading = true;
      })
      .addCase(loadHeroes.fulfilled, (state, action: PayloadAction<any>) => {
        const result = action.payload;
        state.heroes = [...state.heroes, ...result.results];
        state.nextPage = result.info.next;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(loadHeroes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Search

      .addCase(soartedHeroes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        soartedHeroes.fulfilled,
        (state, action: PayloadAction<IAllHeroes>) => {
          const result = action.payload;
          state.sortHeroes = [...state.sortHeroes, ...result.results];
          state.nextPageSort = result.info.next;
          state.isLoading = false;
        }
      )
      .addCase(soartedHeroes.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })

      // Location 1

      .addCase(locationHeroes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        locationHeroes.fulfilled,
        (state, action: PayloadAction<any>) => {
          const result = action.payload.residents;
          state.urlHeroArray = result;
          state.isLoading = false;
        }
      )
      .addCase(locationHeroes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Location 2

      .addCase(requestLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        requestLocation.fulfilled,
        (state, action: PayloadAction<IHeroes[]>) => {
          state.localHeroes = state.localHeroes.concat(action.payload);
          state.isLoading = false;
        }
      )
      .addCase(requestLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // User Favorites Heroes

      .addCase(favoritesLoad.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        favoritesLoad.fulfilled,
        (state, action: PayloadAction<IHeroes[]>) => {
          debugger;
          const result = action.payload;
          state.favoriteHeroes = [...result];
          console.log(state.favoriteHeroes);

          state.isLoading = false;
        }
      )
      .addCase(favoritesLoad.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export const {
  postLocation,
  setWindowSuccess,
  setWindowError,
  deletePopUpInfo,
  loading,
  clearError,
  clearState,
  loadedMarkerTrue,
  loadedMarkerFalse,
  showModal,
  searcher,
  setUser,
  loadFavoritesHeroes,
  addFavoriteHero,
  onClickBtnFavorite,
  deleteFavorite,
  clearPage,
  exit,
} = appSlice.actions;

export default appSlice.reducer;
