import Router from "next/router";
import { AppProps } from "next/app";
import { useIdleTimer } from "react-idle-timer";

import { useAuth } from "@/contexts";
import { IdleTimer } from "@/components";

export const AuthenticatedRoute = (Component: any) => {
  const logout = () => localStorage.clear();

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
      return (
        <>
          <IdleTimer />
          <Component {...props} />
        </>
      );
    } else {
      Router.push("/");
    }
  };
};
