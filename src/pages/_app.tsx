import "@/styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";

import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/logo.png" sizes="any" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
