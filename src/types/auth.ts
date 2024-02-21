export interface GenericRequestResponse {
  responseCode: string;
  status: boolean;
  message: string;
}

export interface ILoginResponse extends GenericRequestResponse {
  data: {
    firstName: string;

    //other types
  };
}
