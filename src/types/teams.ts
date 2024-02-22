export interface IBareResponse {
  message: string;
  status: boolean;
}

export type Users = {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  status: string;
  email: string;
};

export interface IUsersListResponse {
  data: {
    users: Users[];
    totalUsers: number;
    perPage: number;
    currentPage?: number | undefined;
  };
  status: boolean;
}

export type Invite = {
  id: string;
  isUsed: boolean;
  isRevoked: boolean;
  createdAt: string;
  profile: {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    middleName: string;
    email: string;
  };
};

export interface IInvitesListResponse {
  data: {
    invites?: Invite[];
    totalInvites?: number;
    perPage?: number;
    currentPage?: number;
  };
  status: true;
}

export type InviteStateType = {
  invites: string[];
  meta: {
    total: number;
  };
  page: number;
  users: string[];
  userMeta: {
    total: number;
  };
  userPage: number;
  filterModal: boolean;
  selectedInvite: null | object;
  filterObj: {
    role: string;
    isActive: string;
  };
};
