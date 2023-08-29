import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import styles from "./header.module.less";
import { router_page } from "@pages/routers-pages";
import { useDebounce } from "@hooks/useDebounce";
import { useStore } from "@mobx";

const Component = () => {
  const { heroStore } = useStore();
  const { addSearch, clearState, isLoading, loading, clearSearch } = heroStore;
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();
  const logo_name = "Rick and Morty";

  const goToHome = () => {
    clearState();
    router.push(router_page.home_to);
  };

  const makeRequest = useDebounce(() => {
    addSearch(searchValue);
  }, 1000);

  useEffect(() => {
    makeRequest();
  }, [searchValue]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(target.value);

    if (!isLoading) {
      clearSearch();
      loading();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_logo}>
        <div onClick={goToHome} className={styles.container_logo_link}>
          <div className={styles.container_logo_link_decor}>{logo_name}</div>
        </div>
      </div>
      <div className={styles.container_search_box}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Search character ..."
          className={styles.container_search_box_input}
          value={searchValue}
        />
      </div>
    </div>
  );
};

export const Header = observer(Component);
