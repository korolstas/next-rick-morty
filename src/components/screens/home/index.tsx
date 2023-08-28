import { useAppDispatch, useAppSelector } from "@hooks/redux-hooks";
import { Card, ErrorMessage, Loader, InfiniteScroll } from "@components";
import { loadHeroes } from "@store/heroes";
import styles from "../styles/page.module.less";

export const Home = () => {
  const dispatch = useAppDispatch();
  const { error, search, heroes, isLoading, endPage } = useAppSelector(
    (state) => state.heroesReducer
  );

  const fetchData = (page: number) => dispatch(loadHeroes({ page, search }));

  return (
    <div className={styles.container}>
      <div className={styles.container_modals}>
        <InfiniteScroll
          data={heroes}
          search={search}
          maxPage={endPage}
          isLoading={isLoading}
          fetchMore={fetchData}
          renderItem={(item) => <Card hero={item} />}
        />
        {isLoading && <Loader />}
        {error && <ErrorMessage />}
      </div>
    </div>
  );
};
