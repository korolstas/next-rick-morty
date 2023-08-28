import { Provider } from "react-redux";
// import { useMemo } from "react";

import type { AppProps } from "next/app";
import { store } from "../store";
import "@styles/globals.css";
import { Layout } from "@components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout />
      <Component {...pageProps} />
    </Provider>
  );
}
