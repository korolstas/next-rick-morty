import { Card } from "@/components/Card/Card";
import Loader from "@/components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useDebounce } from "@/hooks/useDebounce";
import { router_page } from "@/pages/routers-pages";
import { IHeroes } from "@/types/redux-interfaces";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../home/home.module.less";
import {
  loadedMarkerFalse,
  onClickBtnFavorite,
} from "@/store/appSlice/appSlice";
import { favoritesLoad } from "@/store/appSlice/ActionCreators";

export const Favorites = () => {
  const { isLoading, isUser, favoriteHeroes, isFavorite, arrFavoriteHeroes } =
    useAppSelector((state) => state.appSlice);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const makeRequest = useDebounce(() => {
    if (!isFavorite) {
      dispatch(favoritesLoad(arrFavoriteHeroes));
      dispatch(onClickBtnFavorite(true));
    }
    dispatch(loadedMarkerFalse());
  }, 800);

  useEffect(() => {
    makeRequest();
  }, [arrFavoriteHeroes]);

  const label = "You don't have favorites. Please add your favorites";

  return (
    <div className={styles.container_modals}>
      {!isUser && router.push(router_page.error_to)}
      {isLoading ? (
        <Loader />
      ) : arrFavoriteHeroes.length !== 0 ? (
        favoriteHeroes.map((hero: IHeroes) => (
          <Card key={hero.id} hero={hero} />
        ))
      ) : (
        <h1>{label}</h1>
      )}
    </div>
  );
};
