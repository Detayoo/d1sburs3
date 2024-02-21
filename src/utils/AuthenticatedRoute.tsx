import { NextComponentType, NextPageContext } from "next";
import Router from "next/router";
import { AppProps } from "next/app";

import { useAuth } from "@/contexts";

export const AuthenticatedRoute = (
  Component: NextComponentType<NextPageContext, any, any>
) => {
  return (props: AppProps) => {
    const { loading, fetching, user } = useAuth();
    if (loading || fetching) {
      return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <div className="spinner" />
        </div>
      );
    }

    if (user) {
      return <Component {...props} />;
    } else {
      Router.push("/");
    }
  };
};
