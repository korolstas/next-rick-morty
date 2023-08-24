import { Hero } from "@types";
import styles from "./card.module.less";
import Image from "next/image";

interface Props {
  hero: Hero;
  openModal: (el: Hero) => void;
}

export const Card = ({ hero, openModal }: Props) => {
  return (
    <div onClick={() => openModal(hero)} className={styles.card}>
      <div className={styles.card_info}>
        <h2>{hero.name}</h2>
        <div className={styles.card_info_img}>
          <Image src={hero.image} width={200} height={200} alt="" />
        </div>
      </div>
    </div>
  );
};
