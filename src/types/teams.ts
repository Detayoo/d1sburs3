export interface IBareResponse {
  message: string;
  status: boolean;
}

export interface IUsersListResponse {
  data: {
    users: [
      {
        id: string;
        firstName: string;
        lastName: string;
        middleName: string;
        role: string;
        isActive: boolean;
        createdAt: string;
      },
      {
        id: string;
        firstName: string;
        lastName: string;
        middleName: string;
        role: string;
        isActive: boolean;
        createdAt: string;
      }
    ];
    totalUsers: number;
    perPage: number;
    currentPage: number;
  };
  status: boolean;
}

type Invite = {
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
    invites: Invite[];
    totalInvites: number;
    perPage: number;
    currentPage: number;
  };
  status: true;
}
