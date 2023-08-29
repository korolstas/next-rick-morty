import { makeAutoObservable, runInAction } from "mobx";
import { Heroes } from "@types";
import { getCharacters } from "@api/req";

export class LocationStore {
  urlLocation: string = "";
  localHeroes: Heroes[] = [];
  urlHeroArray: string[] = [];
  searchLocation: string = "";
  isLoading: boolean = true;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  clearStateLocation = () => {
    this.localHeroes = [];
    this.urlHeroArray = [];
    this.urlLocation = "";
    this.isLoading = true;
    this.error = null;
  };

  postLocation = (url: string) => {
    this.urlLocation = url;
  };

  // Location 1

  fetchLocationArr = async (id: string) => {
    this.isLoading = true;
    try {
      const response = await getCharacters.getLocaited(`location/${id}`);
      runInAction(() => {
        this.urlHeroArray = response.data.residents;
      });
    } catch (e: any) {
      this.error = e.response.data.error;
    }
    this.isLoading = false;
  };

  fetchChars = async (url: string[]) => {
    const urlBegin = "/character/";
    this.isLoading = true;
    try {
      const newUrl = url.map((element) => {
        const el = element.split("/").filter((item) => item.length);
        return Number(el[el.length - 1]);
      });
      const response = await getCharacters.getLocaitedChars(urlBegin + newUrl);
      runInAction(() => {
        this.localHeroes = this.localHeroes.concat(response.data);
      });
    } catch (e: any) {
      this.error = e.response.data.error;
    }
    this.isLoading = false;
  };
}
