import { makeAutoObservable, runInAction } from "mobx";
import { Heroes } from "../types";
import { getCharacters } from "@api/req";

interface Sorted {
  page: number;
  search: string;
}

export class HeroStore {
  //Modal

  modalType: string | null = null;
  modalData: Heroes | null = null;
  maxPage: number = 0;
  data: Heroes[] = [];
  isLoading: boolean = false;
  hasMore: boolean = false;
  error: string | null = null;

  // search
  search: string = "";

  // PopUpWindow
  windowError: string[] = [];
  windowSuccess: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  clearState = () => {
    this.modalData = null;
    this.modalType = null;
    this.isLoading = true;
    this.data = [];
    this.maxPage = 1;
  };

  loading = () => {
    this.isLoading = true;
  };

  showModal = ({ modalType, hero }: { modalType: string; hero?: Heroes }) => {
    // debugger
    if (this.modalType) {
      this.modalType = null;
    } else {
      this.modalType = modalType;
    }
    this.modalData = hero || null;
  };

  clearError = () => {
    this.error = null;
  };

  // Search

  clearSearch = () => {
    this.data = [];
    this.maxPage = 0;
    if (this.error) this.error = null;
  };

  addSearch = (search: string) => {
    this.search = search;
  };

  // PopUpWindow

  setWindowSuccess = (text: string) => {
    this.windowSuccess.push(text);
  };

  setWindowError = (error: string) => {
    this.windowError.push(error);
  };

  deletePopUpInfo = () => {
    this.windowError = [];
    this.windowSuccess = [];
  };

  fetchHero = async ({ page, search }: Sorted) => {
    this.isLoading = true;
    try {
      const response = await getCharacters.getChars(page, search || null);

      runInAction(() => {
        const result = response.data;
        this.data = [...this.data, ...result.results];

        this.hasMore = result.results.length > 0;
        this.maxPage = result.info.pages;
        this.error = "";
        this.isLoading = false;
      });
    } catch (e: any) {
      this.isLoading = false;
      this.error = e.response.data.error;
    }
  };
}
