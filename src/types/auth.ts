export interface GenericRequestResponse {
  responseCode: string;
  status: boolean;
  message: string;
}

export interface ILoginResponse extends GenericRequestResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    isActive: boolean;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null | string;
  };
  token: string;
}
