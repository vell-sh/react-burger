export type TApiStatus = {
  success: boolean;
};

export type TApiError = TApiStatus & {
  message: string;
};
