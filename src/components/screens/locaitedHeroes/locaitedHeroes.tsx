import { Card } from "@/components/Card/Card";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMassage";
import Loader from "@/components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useDebounce } from "@/hooks/useDebounce";
import {
  loadedMarkerFalse,
  setWindowError,
} from "@/store/appSlice/appSlice";
import { IHeroes } from "@/types/redux-interfaces";
import { useEffect } from "react";
import styles from "../home/home.module.less";
import {
  locationHeroes,
  requestLocation,
} from "@/store/appSlice/ActionCreators";

export const Locaited = () => {
  const { localHeroes, isLoading, urlLocation, urlHeroArray } = useAppSelector(
    (state) => state.appSlice
  );
  const dispatch = useAppDispatch();

  const makeRequest = useDebounce(() => {
    dispatch(locationHeroes(urlLocation));
    dispatch(loadedMarkerFalse());
  }, 1000);

  useEffect(() => {
    if (urlHeroArray.length) {
      dispatch(requestLocation(urlHeroArray));
    } else {
      dispatch(setWindowError("something went wrong :("));
    }
  }, [urlHeroArray]);

  useEffect(() => {
    makeRequest();
  }, []);

  const allLocalHero = localHeroes.map((hero: IHeroes) => (
    <Card key={hero.id} hero={hero} />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.container_modals}>
        {isLoading ? <Loader /> : allLocalHero} : <ErrorMessage />
      </div>
    </div>
  );
};
