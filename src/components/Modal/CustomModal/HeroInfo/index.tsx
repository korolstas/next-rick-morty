import { Hero } from "@types";
import { InfoHeroParams } from "./InfoHero";
import styles from "./heroModal.module.less";
import { Button } from "@components/Button";

interface Props {
  hero: Hero;
  closeModal: () => void;
}

export const HeroModal = ({ hero, closeModal }: Props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal_box}>
        <Button text="x" onClick={closeModal} variant={"cancel"} />
        <div className={styles.modal_box_info}>
          <img src={hero.image} alt="" />
          <div className={styles.modal_box_info_modal}>
            <InfoHeroParams closeModal={closeModal} hero={hero} />
          </div>
        </div>
      </div>
    </div>
  );
};
