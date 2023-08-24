import { Home } from "@components/screens";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Rick&Morty | Home</title>
      </Head>
      <Home />
    </>
  );
}
