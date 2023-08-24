import { Hero } from "@types";
import styles from "./info.module.less";
import { useRouter } from "next/router";
import { setSearch } from "@redux/search";
import { useAppDispatch } from "@hooks/redux-hooks";

interface Props {
  hero: Hero;
  closeModal: () => void;
}

export const InfoHeroParams = ({ hero, closeModal }: Props) => {
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
      id: hero.location.id,
      route: "/location",
    },
    {
      label: "Origin: ",
      value: hero.origin.name,
      id: hero.origin.id,
      route: "/origin",
    },
  ];

  const linkToLocation = (route: string, id: number) => {
    router.push(`${route}?id=${id}`);
    dispatch(setSearch(''));
    closeModal();
  };

  const getInfo = (route: string | undefined, value: string, id?: number) => {
    if (route && id && value !== "unknown")
      return (
        <label
          onClick={() => linkToLocation(route, id)}
          className={styles.link}
        >
          {value}
        </label>
      );

    return value;
  };

  return (
    <>
      <div className={styles.box_name}>{hero.name}</div>
      {modalsInfo &&
        modalsInfo.map((modalInfo) => (
          <div className={styles.text} key={modalInfo.label}>
            <b>{modalInfo.label}</b>
            {getInfo(modalInfo.route, modalInfo.value, modalInfo.id)}
          </div>
        ))}
    </>
  );
};
