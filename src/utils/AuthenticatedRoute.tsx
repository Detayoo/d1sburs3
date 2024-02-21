import Router from "next/router";

import { useAuth } from "@/contexts";
import { Loader } from "@/components";

export const AuthenticatedRoute = (Component: any) => {
  return (props: any) => {
    const { loading, fetching, user } = useAuth();

    if (loading || fetching) {
      return (
        <div className="w-full h-screen bg-background pt-20 flex flex-col gap-4 items-center">
          <Loader className="h-20 w-20" />
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
