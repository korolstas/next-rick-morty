import { Fragment } from "react";
import { showModal } from "../../../../store/appSlice/appSlice";
import { InfoHeroParams } from "./InfoHero/InfoHero";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";

import styles from "./heroModal.module.less";
import { Button } from "@/components/Button/button";

export const HeroModal = () => {
  const dispatch = useAppDispatch();
  const { modalData } = useAppSelector((state) => state.appSlice);

  return (
    <div className={styles.box}>
      <Button
        spanText="x"
        onClick={() => dispatch(showModal({ visible: "heroModal" }))}
        className={"cancel"}
      />
      <div className={styles.box_info}>
        <img src={modalData.image} alt="" />
        <div className={styles.box_info_modal}>
          <InfoHeroParams hero={modalData} />
        </div>
      </div>
    </div>
  );
};
