import { AllHeroes, Heroes } from "../types";
import { instance } from "./config";

const urlBegin = "/character";

export const getCharacters = {
  getChars(page: number, name: string | null) {
    return instance.get<AllHeroes>(urlBegin, {
      params: { page, name },
    });
  },
  getLocaitedChars(url: string) {
    const res = instance.get<Heroes[]>(url);
    return res;
  },
  getLocaited(url: string) {
    const res = instance.get<AllHeroes>(url);
    return res;
  },
};
