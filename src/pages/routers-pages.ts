interface Roter {
  home_to: string;
  location_to: string;
  favorites_to: string;
  origin_to: string;
  error_to: string;
}

export const router_page: Roter = {
  home_to: "/",
  location_to: "location",
  favorites_to: "favorites",
  origin_to: "origin",
  error_to: "error_404",
};
