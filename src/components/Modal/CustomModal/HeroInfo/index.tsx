import { observer } from "mobx-react-lite";

import { InfoHeroParams } from "./InfoHero";
import styles from "./heroModal.module.less";
import { Button } from "@components";
import { useStore } from "@mobx";

const Component = () => {
  const { heroStore } = useStore();
  const { modalData, showModal } = heroStore;

  return (
    modalData && (
      <div className={styles.box}>
        <Button
          text="x"
          onClick={() => showModal({ modalType: "heroModal" })}
          variant={"cancel"}
        />
        <div className={styles.box_info}>
          <img src={modalData?.image} alt="" />
          <div className={styles.box_info_modal}>
            <InfoHeroParams hero={modalData} />
          </div>
        </div>
      </div>
    )
  );
};

export const HeroModal = observer(Component);
