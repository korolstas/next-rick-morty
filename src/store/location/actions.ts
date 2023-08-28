import { createAsyncThunk } from "@reduxjs/toolkit";

import { getCharacters } from "../../api/req";

export const locationHeroes = createAsyncThunk(
  "heroes/load/located-arr-numbers",
  async (id: string | null, { rejectWithValue }) => {
    try {
      const response = await getCharacters.getLocaitedChars(`location/${id}`);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.error);
    }
  }
);

export const requestLocation = createAsyncThunk(
  "heroes/load/located",
  async (urlHeroArray: string[], { rejectWithValue }) => {
    const urlBegin = "/character/";
    const newUrl = urlHeroArray.map((element) => {
      const el = element.split("/").filter((item) => item.length);
      return Number(el[el.length - 1]);
    });

    try {
      const response = await getCharacters.getLocaitedChars(urlBegin + newUrl);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
