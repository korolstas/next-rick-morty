interface IRoter {
  home_to: string;
  seacrh_to: string;
  location_to: string;
  favorites_to: string;
  error_to: string;
}

export const router_page: IRoter = {
  home_to: "/",
  seacrh_to: "search",
  location_to: "location-hero",
  favorites_to: "favorites",
  error_to: "error_404",
};
