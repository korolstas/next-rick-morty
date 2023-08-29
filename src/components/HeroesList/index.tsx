import { observer } from "mobx-react-lite";

import { useStore } from "@mobx";
import { Card } from "@components";

export const Component = () => {
  const { heroStore } = useStore();
  const { data } = heroStore;

  return (
    <>
      {data.map((hero) => (
        <Card key={hero.id} hero={hero} />
      ))}
    </>
  );
};

export const HeroesList = observer(Component);
