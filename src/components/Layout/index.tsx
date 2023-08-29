import { PropsWithChildren } from "react";
import { observer } from "mobx-react-lite";

import { Header, Modal } from "@components";
import { useStore } from "@mobx";

const Component = ({ children }: PropsWithChildren<{}>) => {
  const { heroStore } = useStore();
  const { modalType } = heroStore;

  return (
    <>
      {modalType && <Modal modalType={modalType} />}

      <Header />

      {children}
    </>
  );
};

export const Layout = observer(Component);
