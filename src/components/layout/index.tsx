import { PropsWithChildren } from "react";
import { Header } from "@components";

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <Header />

      {children}
    </>
  );
};
