import { observer } from "mobx-react-lite";

import { Card, Loader, InfiniteScroll } from "@components";
import { useStore } from "@mobx";
import styles from "../styles/styles.module.less";

const Component = () => {
  const { heroStore } = useStore();
  const { fetchHero, search, isLoading, data, error, maxPage } = heroStore;

  const fetchData = (page: number) => fetchHero({ page, search });

  return (
    <div className={styles.container}>
      <div className={styles.container_modals}>
        <InfiniteScroll
          data={data}
          search={search}
          maxPage={maxPage}
          isLoading={isLoading}
          fetchMore={fetchData}
          renderItem={(item) => <Card hero={item} />}
        />
        {isLoading && <Loader />}
        {error && <span>{error}</span>}
      </div>
    </div>
  );
};

export const Home = observer(Component);
