import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@hooks/redux-hooks";
import { useSearchParams } from "next/navigation";
import styles from "../styles/page.module.less";
import { locationHeroes, requestLocation } from "@store/location";
import { Card, ErrorMessage, Loader } from "@components";

export const Locaited = () => {
  const { localHeroes, isLoading, urlHeroArray, error } = useAppSelector(
    (state) => state.locationReducer
  );
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (urlHeroArray?.length) {
      dispatch(requestLocation(urlHeroArray));
    }
  }, [urlHeroArray]);

  useEffect(() => {
    if (id) dispatch(locationHeroes(id));
  }, [id]);

  const allLocalHero = localHeroes.map((hero) => (
    <Card key={hero.id} hero={hero} />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.container_modals}>
        {allLocalHero && allLocalHero}
        {isLoading && <Loader />}
        {error && <ErrorMessage />}
      </div>
    </div>
  );
};
