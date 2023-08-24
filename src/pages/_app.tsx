import type { AppProps } from "next/app";
import { Layout } from "../components/layout";
import "@styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "@graphQl";
import { Provider } from "react-redux";
import { store } from "@redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Layout />
          <Component {...pageProps} />
        </ApolloProvider>
      </Provider>
    </>
  );
}
