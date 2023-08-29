import { InfiniteScroll } from "@components/InfiniteScroll";
import { Card, Loader } from "@components";
import styles from "./home.module.less";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "@graphQl";
import { useEffect, useState } from "react";
import { HeroModal } from "@components/Modal/CustomModal/HeroInfo";
import { Hero } from "@types";
import { useAppSelector } from "@hooks/redux-hooks";

export const Home = () => {
  const { search } = useAppSelector((state) => state.searchReducer);
  const variables = { page: 1 };
  const { data, loading, error, fetchMore, refetch } = useQuery<{characters: {
    results: Hero[],
    info: any
  }}>(
    GET_CHARACTERS,
    {
      variables,
    }
  );

  useEffect(() => {
    if (search !== undefined) refetch({ page: 1, name: search });
  }, [search]);

  const [hero, setHero] = useState<Hero | null>(null);

  const openModal = (hero: Hero) => setHero(hero);
  const closeModal = () => setHero(null);

  const fetchData = (page: number) => {
    const variables = { page };
    fetchMore({
      variables,
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_modals}>
          {data && (
            <InfiniteScroll
              data={data.characters.results}
              maxPage={data.characters.info.pages}
              isLoading={loading}
              fetchMore={fetchData}
              renderItem={(item) => <Card openModal={openModal} hero={item} />}
            />
          )}
          {loading && <Loader />}
          {error && error.message}
        </div>
      </div>
      {hero && <HeroModal hero={hero} closeModal={closeModal} />}
    </>
  );
};
