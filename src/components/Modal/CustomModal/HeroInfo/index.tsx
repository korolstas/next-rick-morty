import { showModal } from "@store/heroes";
import { InfoHeroParams } from "./InfoHero";
import { useAppDispatch, useAppSelector } from "@hooks/redux-hooks";
import styles from "./heroModal.module.less";
import { Button } from "@components";

export const HeroModal = () => {
  const dispatch = useAppDispatch();
  const { modalData } = useAppSelector((state) => state.heroesReducer);
  const closeModal = () => dispatch(showModal({ modalType: "heroModal" }));

  return (
    <div className={styles.box}>
      <Button text="x" onClick={closeModal} variant={"cancel"} />
      {modalData && (
        <div className={styles.box_info}>
          <img src={modalData.image} alt="" />
          <div className={styles.box_info_modal}>
            <InfoHeroParams hero={modalData} />
          </div>
        </div>
      )}
    </div>
  );
};
