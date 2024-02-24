import { UploadFileResponse } from ".";

export * from "./auth";
export * from "./teams";
export * from "./settings";
export * from "./transactions";

export type stateType = {
  currentPage?: number;
  download?: boolean;
  approve?: boolean;
  showPreviewToast?: boolean;
  selected?: UploadFileResponse;
};
