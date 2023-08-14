export interface IHeroes {
  id: number;
  name: string;
  gender: string;
  status: string;
  location: {
    name: string;
    url: string;
  };
  image: string;
  species: string;
  isEqual: boolean;
  isFavorite: boolean;
}

export interface IAllHeroes {
  info: {
    next: string;
  };
  results: IHeroes[];
  residents: string[];
}
