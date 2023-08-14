import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { headerLogout } from "../headerBtns";
import { Button } from "@/components/Button/button";
import { router_page } from "@/pages/routers-pages";
import { useRouter } from "next/router";
import Image from "next/image";
import noUserImg from "../../../../../public/img/no_photo_user.png";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import styles from "../header.module.less";
import { loading, setUser } from "@/store/appSlice/appSlice";

type TOpenModal = {
  openModal: (item: string) => void;
};

export const LoginHeader = ({ openModal }: TOpenModal) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { name, image, id, arrFavoriteHeroes } = useAppSelector(
    (state) => state.appSlice
  );

  const autorize = ({ image }: { image?: string }) =>
    dispatch(setUser({ image }));

  const imageHandle = (files: any) => {
    const file = files;
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target ? e.target.result : null;
      if (!result) return;
      autorize({
        image: result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const selectImageButton = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        imageHandle(file);

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
        src={image ? image : noUserImg}
        alt=""
        width={35}
        height={35}
      />
      <div className={styles.container_btns_name}>{name}</div>
      {headerLogout.map((item) =>
        item.info.label === "Favorites" ? (
          <Button
            key={item.id}
            spanText={`${item.info.label} (${arrFavoriteHeroes.length})`}
            className={item.info.className}
            onClick={handleBttnClickRout}
          />
        ) : (
          <Button
            key={item.id}
            spanText={item.info.label}
            className={item.info.className}
            onClick={() => openModal(item.modalType ? item.modalType : "")}
          />
        )
      )}
    </>
  );
};
