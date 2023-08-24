import { useDebounce } from "@hooks/useDebounce";
import styles from "./header.module.less";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux-hooks";
import { setSearch } from "@redux/search";
import { client } from "@graphQl";

export const Header = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.searchReducer);
  const [searchValue, setSearchValue] = useState<string>();

  const logo_name = "Rick and Morty";

  const goToHome = () => {
    setSearchValue("");
    router.push("/");
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(target.value);
  };

  const resetClient = async () => client.resetStore();

  const makeRequest = useDebounce(() => {
    resetClient();
    dispatch(setSearch(searchValue));
    router.push("/");
  }, 1000);

  useEffect(() => {
    makeRequest();
  }, [searchValue]);

  return (
    <div className={styles.container}>
      <div className={styles.container_logo}>
        <div onClick={goToHome} className={styles.container_logo_link}>
          <div className={styles.container_logo_link_decor}>{logo_name}</div>
        </div>
      </div>
      <div className={styles.container_search_box}>
        <input
          className={styles.container_search_box_input}
          placeholder={"Search here..."}
          value={search}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
