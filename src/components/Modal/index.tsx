import { HeroModal } from "./CustomModal/HeroInfo";
import styles from "./modal.module.less";
import { modalTypes } from "./CustomModal/modalTypes";

interface Props {
  closeModal: () => void;
  modalType: string;
}

export const Modal = ({ closeModal, hero }: Props) => {
  const modal = () => {
    switch (modalType) {
      case modalTypes.ByHero:
        return <HeroModal hero={} closeModal={closeModal}/>;
      default:
        return null;
    }
  };
  return <div className={styles.modal}>{modal()}</div>;
};
