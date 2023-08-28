import { useRouter } from "next/router";

import { Heroes } from "@types";
import { useAppDispatch, useAppSelector } from "@hooks/redux-hooks";
import {  clearInputValue, showModal } from "@store/heroes";
import styles from "./info.module.less";
import { clearStateLocation, setId } from "@store/location";

export const InfoHeroParams = ({ hero }: { hero: Heroes }) => {
  const { id } = useAppSelector((state) => state.locationReducer);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const modalsInfo = [
    {
      label: "Gender: ",
      value: hero.gender,
    },
    {
      label: "Species: ",
      value: hero.species,
    },
    {
      label: "Status: ",
      value: hero.status,
    },
    {
      label: "Location: ",
      value: hero.location.name,
      url: hero.location.url,
    },
    {
      label: "Origin: ",
      value: hero.origin.name,
      url: hero.origin.url,
    },
  ];

  const linkToUrl = (url: string, label: string) => {
    dispatch(showModal({ modalType: "heroModal" }));
    const idLocation = url.split("/").filter((item: string) => item.length);
    const beginUrl = label.toLowerCase().split(":");
    router.push(`${beginUrl[0]}?id=${idLocation[idLocation.length - 1]}`);
    dispatch(clearInputValue());
    if (id !== Number(idLocation[idLocation.length - 1])) {
      dispatch(clearStateLocation());
      dispatch(setId(Number(idLocation[idLocation.length - 1])));
    }
  };

  const getItems = (value: string, label: string, url?: string) => {
    if (url)
      return (
        <label className={styles.link} onClick={() => linkToUrl(url, label)}>
          {value}
        </label>
      );
    return value;
  };

  return (
    <>
      <div className={styles.box_name}>{hero.name}</div>

      {modalsInfo.map(({ label, value, url }) => (
        <div className={styles.text} key={label}>
          <b className={styles.text}>{label}</b>
          {getItems(value, label, url)}
        </div>
      ))}
    </>
  );
};
