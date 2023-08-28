import { useEffect, useState } from "react";
import Image from "next/image";
import { doc, setDoc } from "firebase/firestore";

import styles from "./card.module.less";
import { showModal } from "@store/heroes";
import { useAppDispatch, useAppSelector } from "@hooks/redux-hooks";
import { Heroes } from "@types";
import noneHeart from "@/../public/img/none_heart.png";
import heart from "@/../public/img/heart.png";
import { db } from "@/../firebase";
import { addFavoriteHero, deleteFavorite } from "@store/user";

export const Card = ({ hero }: { hero: Heroes }) => {
  const dispatch = useAppDispatch();
  const [isClick, setIsClick] = useState<boolean>(false);
  const { isUser, arrFavoriteHeroes, id } = useAppSelector(
    (state) => state.userReducer
  );
  const showModalOfHero = (hero: Heroes) => {
    dispatch(showModal({ hero, modalType: "heroModal" }));
  };

  const loadArrIntoWeb = async () => {
    try {
      await setDoc(doc(db, "user", `${id}`), {
        favorites: arrFavoriteHeroes,
      });
    } catch (error: any) {}
  };

  const addFavorite = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
    if (isClick) {
      dispatch(deleteFavorite(hero.id));
    } else {
      dispatch(addFavoriteHero(hero));
    }
    setIsClick(!isClick);
    loadArrIntoWeb();
  };

  useEffect(() => {
    const isFavoriteHero = arrFavoriteHeroes.some((item: number) => {
      return item === hero.id;
    });
    setIsClick(isFavoriteHero);
  }, [arrFavoriteHeroes]);

  return (
    <div onClick={() => showModalOfHero(hero)} className={styles.card}>
      {isUser && (
        <Image
          width={32}
          height={32}
          className={styles.card_heart}
          onClick={addFavorite}
          src={isClick ? heart : noneHeart}
          alt=""
        />
      )}
      <div className={styles.card_info}>
        <h2>{hero.name}</h2>
        <div className={styles.card_info_img}>
          <Image src={hero.image} width={200} height={200} alt="" />
        </div>
      </div>
    </div>
  );
};
