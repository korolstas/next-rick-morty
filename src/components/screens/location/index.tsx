import { Card } from "@/components";
import { Loader } from "@/components";
import { useState } from "react";
import styles from "../home/home.module.less";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_LOCATION_BY_ID } from "@graphQl";
import { HeroModal } from "@components/Modal/CustomModal/HeroInfo";
import { Hero } from "@types";

export const Location = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [hero, setHero] = useState<Hero | null>(null);
  const openModal = (hero: Hero) => setHero(hero);
  const closeModal = () => setHero(null);

  const variables = { id };
  const { data, loading, error } = useQuery(GET_LOCATION_BY_ID, {
    variables,
  });

  const arrLocalHero = data?.location?.residents.map((hero: Hero) => (
    <Card key={hero.id} hero={hero} openModal={openModal} />
  ));

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_modals}>
          {data && arrLocalHero}
          {loading && <Loader />}
          {error && <span style={{ color: "red" }}>{error.message}</span>}
        </div>
      </div>
      {hero && <HeroModal hero={hero} closeModal={closeModal} />}
    </>
  );
};
