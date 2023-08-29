import { HeroStore } from "@mobx/hero";
import { LocationStore } from "@mobx/location";
import { createContext, useContext } from "react";

interface Store {
  heroStore: HeroStore;
  locationStore: LocationStore;
}

const store: Store = {
  heroStore: new HeroStore(),
  locationStore: new LocationStore(),
};

const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);
