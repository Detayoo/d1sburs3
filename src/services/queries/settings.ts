import { authenticatedApi } from "..";
import { IChangePasswordResponse } from "@/types";

export const changePasswordFn = async ({
  payload,
}: {
  payload: {
    oldPassword: string;
    password: string;
  };
}) => {
  const { data } = await authenticatedApi().patch<IChangePasswordResponse>(
    "/user/change-password",
    payload
  );

  return data;
};
