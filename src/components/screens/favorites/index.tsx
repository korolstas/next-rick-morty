import { Card } from "@/components";
import { Loader } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useDebounce } from "@/hooks/useDebounce";
import { router_page } from "@/pages/routers-pages";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../home/home.module.less";
import { loadedMarkerFalse, onClickBtnFavorite } from "@/store/appSlice";
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

  const getContent = () => {
  const label = "You don't have favorites. Please add your favorites";

    if (!isUser) router.push(router_page.error_to);

    if (isLoading) return <Loader />;

    if (arrFavoriteHeroes.length === 0) return <h1>{label}</h1>;

    return favoriteHeroes.map((hero) => <Card key={hero.id} hero={hero} />);
  };

  return (
    <div className={styles.container_modals}>
      {getContent()}
    </div>
  )
};
