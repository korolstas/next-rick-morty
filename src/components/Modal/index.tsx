import { HeroModal } from "./CustomModal/HeroInfo";
import styles from "./modal.module.less";

export const enum modalTypes {
  ByHero = "heroModal",
  // BySingUp = "signUpModal",
  // BySingIn = "signInModal",
  // ByLogout = "logout",
}

export const Modal = ({ modalType }: { modalType: string }) => {
  const modal = () => {
    switch (modalType) {
      case modalTypes.ByHero:
        return <HeroModal />;
      default:
        return null;
    }
  };

  return <div className={styles.modal}>{modal()}</div>;
};
