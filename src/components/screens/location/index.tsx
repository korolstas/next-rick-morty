import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { observer } from "mobx-react-lite";

import styles from "../styles/styles.module.less";
import { Card, Loader } from "@components";
import { useStore } from "@mobx";

const Component = () => {
  const { locationStore } = useStore();
  const { fetchChars, fetchLocationArr, urlHeroArray, localHeroes, isLoading } =
    locationStore;

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) fetchLocationArr(id);
  }, [id]);

  useEffect(() => {
    if (urlHeroArray?.length) {
      fetchChars(urlHeroArray);
    }
  }, [urlHeroArray]);

  const allLocalHero = localHeroes.map((hero) => (
    <Card key={hero.id} hero={hero} />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.container_modals}>
        {isLoading ? <Loader /> : allLocalHero}
      </div>
    </div>
  );
};

export const Location = observer(Component);
