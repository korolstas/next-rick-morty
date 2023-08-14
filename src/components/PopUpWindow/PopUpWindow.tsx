import { useEffect } from "react";
import styles from "./window.module.less";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { deletePopUpInfo } from "@/store/appSlice/appSlice";

type TPopWindow = { label: string; className: string };

export const PopUpWindow = ({ label, className }: TPopWindow) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hideErrorTimeout = setTimeout(() => {
      dispatch(deletePopUpInfo());
    }, 3000);

    return () => {
      clearTimeout(hideErrorTimeout);
    };
  }, []);

  return (
    <div className={styles.window}>
      <label className={styles[className]}>{label}</label>
    </div>
  );
};
