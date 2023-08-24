export interface Hero {
  id: number;
  name: string;
  gender: string;
  status: string;
  image: string;
  species: string;
  location: {
    name: string;
    id: number;
  };
  origin: {
    name: string;
    id: number;
  };
}
