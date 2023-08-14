import { exit, showModal } from "../../../../../store/appSlice/appSlice";
import { useAppDispatch } from "../../../../../hooks/redux-hooks";
import { Button } from "../../../../Button/button";
import sad from "../../../../../../public/img/portal.png";
import Image from "next/image";
import styles from "./logout.module.less";
import { useRouter } from "next/router";

type TLogout = {
  info: {
    modalType: string;
    header: string;
  };
};

export const Logout = ({ info }: TLogout) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const className = "modal_submit";

  const closeModal = (isExit: boolean) => {
    if (isExit) {
      dispatch(exit());
      router.push("/");
    }
    dispatch(showModal({ visible: info.modalType }));
  };

  return (
    <div className={styles.modal}>
      <header>{info.header}</header>
      <div className={styles.modal_box}>
        <Image width={250} height={250} src={sad} alt="loading" />
        <div className={styles.modal_box_submit_btns}>
          <Button
            onClick={() => closeModal(false)}
            spanText="No"
            className={className}
          />
          <Button
            onClick={() => closeModal(true)}
            spanText="Yes"
            className={className}
          />
        </div>
      </div>
    </div>
  );
};
