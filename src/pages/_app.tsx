import type { AppProps } from "next/app";
import Head from "next/head";
import { AuthProvider } from "@/contexts";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Head>
          <link rel="icon" href="/images/logo-favicon.svg" sizes="any" />
        </Head>
        <Component {...pageProps} />
        <ToastContainer limit={2} />
      </QueryClientProvider>
    </AuthProvider>
  );
}
