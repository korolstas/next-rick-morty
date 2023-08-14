import { Button } from "@/components/Button/button";
import { headerSing } from "../headerBtns";

type TOpenModal = {
  openModal: (item: string) => void;
};

export const UnLoginHeader = ({ openModal }: TOpenModal) => {
  return headerSing.map((item) => (
    <Button
      key={item.id}
      spanText={item.info.label}
      className={item.info.className}
      onClick={() => openModal(item.modalType ? item.modalType : "")}
    />
  ));
};
