import Image from "next/image";
import { observer } from "mobx-react-lite";

import styles from "./card.module.less";
import { Heroes } from "@types";
import { useStore } from "@mobx";

export const Component = ({ hero }: { hero: Heroes }) => {
  const { heroStore } = useStore();
  const { showModal } = heroStore;
  const showModalWithHeroData = (hero: Heroes) => {
    showModal({ hero, modalType: "heroModal" });
  };

  return (
    <div onClick={() => showModalWithHeroData(hero)} className={styles.card}>
      <div className={styles.card_info}>
        <h2>{hero.name}</h2>
        <div className={styles.card_info_img}>
          <Image src={hero.image} width={200} height={200} alt="" />
        </div>
      </div>
    </div>
  );
};
export const Card = observer(Component);
