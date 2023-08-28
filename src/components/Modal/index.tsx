import {
  HeroModal,
  Logout,
  SignIn,
  SignUp,
  infoLogin,
} from "./CustomModal";
import styles from "./modal.module.less";

const enum modalTypes {
  ByHero = "heroModal",
  BySingUp = "signUpModal",
  BySingIn = "signInModal",
  ByLogout = "logout",
}

export const Modal = ({ modalType }: { modalType: string }) => {
  const modal = () => {
    switch (modalType) {
      case modalTypes.ByHero:
        return <HeroModal />;
      case modalTypes.BySingUp:
        return <SignUp info={infoLogin.infoSingUp} />;
      case modalTypes.BySingIn:
        return <SignIn info={infoLogin.infoSingIn} />;
      case modalTypes.ByLogout:
        return <Logout info={infoLogin.infoLogout} />;
      default:
        return null;
    }
  };

  return <div className={styles.modal}>{modal()}</div>;
};
