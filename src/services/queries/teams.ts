import { authenticatedApi } from "..";
import {
  IBareResponse,
  IInvitesListResponse,
  IUsersListResponse,
} from "@/types";

export const inviteTeamMemberFn = async ({
  payload,
}: {
  payload: {
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    role: string;
  };
}) => {
  const { data } = await authenticatedApi().post<IBareResponse>(
    "/invite",
    payload
  );

  return data;
};

export const getInviteListFn = async ({
  currentPage,
  perPage,
}: {
  currentPage?: number;
  perPage?: number;
}) => {
  const params: any = {};

  if (currentPage) {
    params.currentPage = currentPage;
  }
  if (perPage) {
    params.perPage = perPage;
  }
  const { data } = await authenticatedApi().get<IInvitesListResponse>(
    "/invite",
    {
      params,
    }
  );

  return data;
};
export const getUsersListFn = async ({
  currentPage,
  perPage,
  role,
  isActive,
}: {
  currentPage?: number;
  perPage?: number;
  role?: string;
  isActive?: boolean;
}) => {
  const params: any = {};

  if (currentPage) {
    params.currentPage = currentPage;
  }
  if (perPage) {
    params.perPage = perPage;
  }
  if (role) {
    params.role = role;
  }

  if (isActive !== undefined) {
    params.isActive = isActive;
  }

  const { data } = await authenticatedApi().get<IUsersListResponse>("/user", {
    params,
  });

  return data;
};

export const revokeInviteFn = async ({ id }: { id: string }) => {
  const { data } = await authenticatedApi().patch<IBareResponse>(
    "/invite/revoke",
    {
      id,
    }
  );

  return data;
};

export const manageUserStatusFn = async ({
  userId,
  status,
}: {
  userId: string;
  status: string;
}) => {
  const { data } = await authenticatedApi().patch<IBareResponse>(
    "/user/manage-status",
    {
      userId,
      status,
    }
  );

  return data;
};

export const changeUsersPasswordFn = async ({ userId }: { userId: string }) => {
  const { data } = await authenticatedApi().patch<IBareResponse>(
    "/user/override-password",
    {
      userId,
    }
  );

  return data;
};
