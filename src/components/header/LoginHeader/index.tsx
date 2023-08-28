import { useRouter } from "next/router";
import Image from "next/image";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import { useAppDispatch, useAppSelector } from "@hooks/redux-hooks";
import { headerLogout } from "../headerBtns";
import { Button } from "@components";
import { router_page } from "@pages/routers-pages";
import noUserImg from "@/../public/img/no_photo_user.png";
import styles from "../header.module.less";
import { loading } from "@store/heroes";
import { imageHandle } from "@helpers";
import { setUser } from "@store/user";

interface OpenModal {
  openModal: (item: string) => void;
}

export const LoginHeader = ({ openModal }: OpenModal) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { name, image, id, arrFavoriteHeroes } = useAppSelector(
    (state) => state.userReducer
  );

  const selectImageButton = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        imageHandle(file, dispatch, setUser);

        const storage = getStorage();
        const storageRef = ref(storage, `${id}.jpg`);
        uploadBytes(storageRef, file).then((snapshot) => {
          console.log("Uploaded a file!");
        });
      }
    };
    fileInput.click();
  };

  const handleBttnClickRout = () => {
    dispatch(loading());
    router.push(router_page.favorites_to);
  };

  return (
    <>
      <Image
        style={{ cursor: "pointer" }}
        onClick={selectImageButton}
        src={image || noUserImg}
        alt=""
        width={35}
        height={35}
      />
      <div className={styles.container_btns_name}>{name}</div>
      {headerLogout.map(({id, info, modalType}) =>
        info.label === "Favorites" ? (
          <Button
            key={id}
            text={`${info.label} (${arrFavoriteHeroes.length})`}
            variant={"green"}
            onClick={handleBttnClickRout}
          />
        ) : (
          <Button
            key={id}
            text={info.label}
            variant={"green"}
            onClick={() => openModal(modalType || "")}
          />
        )
      )}
    </>
  );
};
