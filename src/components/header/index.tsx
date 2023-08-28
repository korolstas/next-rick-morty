import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "./header.module.less";
import { useAppDispatch, useAppSelector } from "@hooks/redux-hooks";
import { router_page } from "@pages/routers-pages";
import { UnLoginHeader } from "./UnLoginHeader";
import { LoginHeader } from "./LoginHeader";
import { useDebounce } from "@hooks/useDebounce";
import {
  addSearch,
  clearSearch,
  clearState,
  loading,
  showModal,
} from "@store/heroes";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { isLoading, search } = useAppSelector((state) => state.heroesReducer);
  const { isUser } = useAppSelector((state) => state.userReducer);
  const [searchValue, setSearchValue] = useState<string>(search);
  const router = useRouter();
  const logo_name = "Rick and Morty";

  const openModal = (modalType: string) => {
    dispatch(showModal({ modalType }));
  };

  const goToHome = () => {
    dispatch(clearState());
    router.push(router_page.home_to);
  };

  const makeRequest = useDebounce(() => {
    dispatch(addSearch(searchValue));
  }, 1000);

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  useEffect(() => {
    makeRequest();
  }, [searchValue]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(target.value);

    if (!isLoading) {
      dispatch(loading());
      dispatch(clearSearch());
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
      <div className={styles.container_btns}>
        {isUser ? (
          <LoginHeader openModal={openModal} />
        ) : (
          <UnLoginHeader openModal={openModal} />
        )}
      </div>
    </div>
  );
};
