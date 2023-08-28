import { useAppSelector } from "@hooks/redux-hooks";
import { Card } from "../Card";

export const HeroesList = () => {
  const { heroes } = useAppSelector(
    (state) => state.heroesReducer
  );
  const sortHeroes: any[] = [];
  const renderHeroes = sortHeroes || heroes;

  return (
    <>
      {renderHeroes.map((hero) => (
        <Card key={hero.id} hero={hero} />
      ))}
    </>
  );
};
