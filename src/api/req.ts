import { IAllHeroes, IHeroes } from "../types/redux-interfaces";
import { instance } from "./config";

const urlBegin = "/character";

export const getCharacters = {
  getChars(url: string | null) {
    if (url) {
      const res = instance.get<IAllHeroes>(url);
      return res;
    } else {
      const response = instance.get<IAllHeroes>(urlBegin);
      return response;
    }
  },
  getSortedChars(url: string | null, search: string) {
    const urlBegin = "/character";
    if (url) {
      const res = instance.get<IAllHeroes>(url);
      return res;
    } else {
      const res = instance.get<IAllHeroes>(
        `${urlBegin}/?page=1&name=${search}`
      );
      return res;
    }
  },
  getLocaitedChars(url: string) {
    const res = instance.get<IHeroes[]>(url);
    return res;
  },
};
