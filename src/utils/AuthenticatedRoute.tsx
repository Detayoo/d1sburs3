import { NextComponentType, NextPageContext } from "next";
import Router from "next/router";
import { AppProps } from "next/app";

import { useAuth } from "@/contexts";

export const AuthenticatedRoute = (
  Component: NextComponentType<NextPageContext, any, any>
) => {
  // eslint-disable-next-line react/display-name
  return (props: AppProps) => {
    // eslint-disable-next-line react/display-name, react-hooks/rules-of-hooks
    const { loading, user } = useAuth();
    if (loading) {
      return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <div className="spinner" />
        </div>
      );
    }

    if (user) {
      return <Component {...props} />;
    }

    else {
      Router.push("/");
    }
  };
};
