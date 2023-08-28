import { AllHeroes, Heroes } from "../types";
import { instance } from "./config";

const URL_BEGIN = "/character";

export const getCharacters = {
  getChars(page: number, name: string | null) {
    return instance.get<AllHeroes>(URL_BEGIN, {
      params: { page, name },
    });
  },
  getLocaited(url: string) {
    const res = instance.get<AllHeroes>(url);
    return res;
  },
  getLocaitedChars(url: string) {
    const res = instance.get<Heroes[]>(url);
    return res;
  },
};
