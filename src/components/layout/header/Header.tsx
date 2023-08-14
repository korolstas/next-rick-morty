import styles from "./header.module.less";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import {
  clearState,
  loading,
  searcher,
  showModal,
} from "@/store/appSlice/appSlice";
import { useRouter } from "next/router";
import { router_page } from "@/pages/routers-pages";
import { useState } from "react";
import { UnLoginHeader } from "./UnLoginHeader";
import { LoginHeader } from "./LoginHeader";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { isUser } = useAppSelector((state) => state.appSlice);
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();
  const logo_name = "Rick and Morty";

  const openModal = (modalType: string) => {
    dispatch(showModal({ modalType }));
  };

  const goToHome = () => {
    dispatch(clearState());
    router.push(router_page.home_to);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchValue.length) {
        router.push(router_page.seacrh_to);
        dispatch(loading());
      } else router.push(router_page.home_to);
      dispatch(searcher(searchValue));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
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
            onKeyDown={handleKeyDown}
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
    </>
  );
};
