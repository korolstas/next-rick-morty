import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

import { Heroes } from "@types";
import styles from "./info.module.less";
import { useStore } from "@mobx";

const Component = ({ hero }: { hero: Heroes }) => {
  const router = useRouter();
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

  const { heroStore } = useStore();
  const { showModal } = heroStore;

  const linkToUrl = (url: string, label: string) => {
    showModal({ modalType: "heroModal" });
    const idLocation = url.split("/").filter((item: string) => item.length);
    const beginUrl = label.toLowerCase().split(":");
    router.push(`${beginUrl[0]}?id=${idLocation[idLocation.length - 1]}`);
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

      {modalsInfo &&
        modalsInfo.map(({ value, label, url }) => (
          <div className={styles.text} key={label}>
            <b className={styles.text}>{label}</b>
            {getItems(value, label, url)}
          </div>
        ))}
    </>
  );
};

export const InfoHeroParams = observer(Component);
