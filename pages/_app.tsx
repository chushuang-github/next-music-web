import "normalize.css";
import "@/styles/globals.scss";
import Layout from "@/components/layout";
import { Provider } from "react-redux";
import wrapperStore from "@/store";
import type { AppProps } from "next/app";

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapperStore.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}
