import { Heroes } from "@store/heroes";

export interface LocationState {
  id: number | null;
  urlHeroArray: string[];
  localHeroes: Heroes[];
  searchLocation: string;
  isLoading: boolean;
  error: string | null;
}

export interface LocationHeroes {
  created: string;
  dimension: string;
  id: number;
  name: string;
  residents: string[];
  type: string;
  url: string;
}
