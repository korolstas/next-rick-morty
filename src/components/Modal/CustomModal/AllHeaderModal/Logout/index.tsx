import Image from "next/image";
import { useRouter } from "next/router";

import { showModal } from "@store/heroes";
import { useAppDispatch } from "@hooks/redux-hooks";
import { Button } from "@components";
import sad from "@/../public/img/portal.png";
import styles from "./logout.module.less";
import { exit } from "@store/user";
import { Props } from "../types";

export const Logout = ({ info }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const closeModal = (isExit: boolean) => {
    if (isExit) {
      dispatch(exit());
      router.push("/");
    }
    dispatch(showModal({ visible: info.typeModal }));
  };

  return (
    <div className={styles.modal}>
      <header>{info.header}</header>
      <div className={styles.modal_box}>
        <Image width={250} height={250} src={sad} alt="loading" />
        <div className={styles.modal_box_submit_btns}>
          <Button
            onClick={() => closeModal(false)}
            text="No"
            variant={"submit"}
          />
          <Button
            onClick={() => closeModal(true)}
            text="Yes"
            variant={"submit"}
          />
        </div>
      </div>
    </div>
  );
};
