import { ILoginResponse } from "@/types/auth";
import { baseApi } from "..";

export const loginFn = async ({
  payload,
}: {
  payload: {
    email: string;
    password: string;
  };
}) => {
  const { data } = await baseApi.post<ILoginResponse>("/auth", payload);

  return data;
};
