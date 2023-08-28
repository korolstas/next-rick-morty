import { useAppSelector } from "@hooks/redux-hooks";
import styles from "./error.module.less";

export const ErrorMessage = () => {
  const { error } = useAppSelector((state) => state.heroesReducer);

  if (!error) return null;

  return (
    <div className={styles.box}>
      <label className={styles.box_label}>{error}</label>
    </div>
  );
};
