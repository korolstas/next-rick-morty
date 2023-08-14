import React from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
import { IHeroes } from "@/types/redux-interfaces";
import { Card } from "../Card/Card";

export const HeroesList = () => {
  const { heroes, search, sortHeroes } = useAppSelector(
    (state) => state.appSlice
  );
  const renderHeroes = search.length !== 0 ? sortHeroes : heroes;

  return (
    <>
      {renderHeroes.map((hero: IHeroes) => (
        <Card key={hero.id} hero={hero} />
      ))}
    </>
  );
};
