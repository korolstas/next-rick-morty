import { createAsyncThunk } from "@reduxjs/toolkit";

import { getCharacters } from "../../api/req";

interface Props {
  page: number;
  search: string;
}

export const loadHeroes = createAsyncThunk(
  "heroes/load/home",
  async ({ page, search }: Props, { rejectWithValue }) => {
    try {
      const response = await getCharacters.getChars(page, search || null);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.error);
    }
  }
);
