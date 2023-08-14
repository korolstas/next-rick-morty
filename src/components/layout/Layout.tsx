import { FC, Fragment, PropsWithChildren } from "react";
import { Header } from "./header/Header";
import { Modal } from "../Modal/Modal";
import { useAppSelector } from "@/hooks/redux-hooks";
import { PopUpWindow } from "../PopUpWindow/PopUpWindow";
import styles from "../layout/layout.module.less";

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { modalType, windowSuccess, windowError } = useAppSelector(
    (state) => state.appSlice
  );

  return (
    <>
      {modalType && <Modal modalType={modalType} />}

      <Header />

      {children}

      <div className={styles.window_list}>
        {windowSuccess &&
          windowSuccess.map((item) => (
            <Fragment key={item}>
              <PopUpWindow label={item} className={"success"} />
            </Fragment>
          ))}
        {windowError &&
          windowError.map((item) => (
            <Fragment key={item}>
              <PopUpWindow key={item} label={item} className={"error"} />
            </Fragment>
          ))}
      </div>
    </>
  );
};

export default Layout;
