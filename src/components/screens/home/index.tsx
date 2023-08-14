import { useEffect, useState } from "react";
import styles from "./home.module.less";
import { useDebounce } from "../../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { loadHeroes } from "../../../store/appSlice/ActionCreators";
import {
  loadedMarkerTrue,
  loadedMarkerFalse,
} from "../../../store/appSlice/appSlice";
import Loader from "@/components/Loader/Loader";
import { HeroesList } from "@/components/HeroesList/HeroesList";

const Home = () => {
  const dispatch = useAppDispatch();

  const { isLoadedData, nextPage, isLoading, heroes } = useAppSelector(
    (state) => state.appSlice
  );

  const makeRequest = useDebounce(() => {
    const isLoad = heroes.length === 0 || (isLoadedData && nextPage !== null);
    if (isLoad) {
      dispatch(loadHeroes(nextPage));
    }
    dispatch(loadedMarkerFalse());
  }, 1000);

  const isScrollHandler = () => {
    const isScroll =
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
      1;
    if (isScroll) {
      dispatch(loadedMarkerTrue());
    }
  };

  useEffect(() => {
    makeRequest();
  }, [isLoadedData, isLoading]);

  useEffect(() => {
    document.addEventListener("scroll", isScrollHandler);
    return function () {
      document.removeEventListener("scroll", isScrollHandler);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container_modals}>
        {isLoading ? <Loader /> : <HeroesList />}
      </div>
    </div>
  );
};

export default Home;