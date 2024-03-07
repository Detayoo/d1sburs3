import { authenticatedApi } from "..";
import {
  AllBatchTransactionsListResponse,
  BatchTransactionDetailResponse,
  BatchTransactionListResponse,
  IBareResponse,
  SingleTransactionDetailResponse,
  UploadFileResponse,
} from "@/types";

export const uploadFileFn = async ({ payload }: { payload: FormData }) => {
  const { data } = await authenticatedApi().post<UploadFileResponse>(
    "/disbursement/upload",
    payload,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return data;
};

export const getBatchTransactionDetailFn = async ({ id }: { id: string }) => {
  const { data } = await authenticatedApi().get<BatchTransactionDetailResponse>(
    `/disbursement/batch-transaction?id=${id}`
  );

  return data;
};

export const getAllBatchListFn = async ({
  currentPage,
  perPage,
}: {
  currentPage?: number;
  perPage?: number;
}) => {
  const params: {
    perPage?: number;
    currentPage?: number;
  } = {};
  if (perPage) {
    params.perPage = perPage;
  }
  if (currentPage) {
    params.currentPage = currentPage;
  }
  const { data } =
    await authenticatedApi().get<AllBatchTransactionsListResponse>(
      "/disbursement/batch",
      {
        params,
      }
    );
  return data;
};

export const getBatchTransactionListFn = async ({
  currentPage,
  perPage,
  batchReference,
}: {
  currentPage?: number;
  perPage?: number;
  batchReference?: any;
}) => {
  const params: {
    currentPage?: number;
    perPage?: number;
    batchReference?: string;
  } = {};

  if (currentPage) {
    params.currentPage = currentPage;
  }
  if (perPage) {
    params.perPage = perPage;
  }
  if (batchReference) {
    params.batchReference = batchReference;
  }

  const { data } = await authenticatedApi().get<BatchTransactionListResponse>(
    "/disbursement/batch-transactions",
    {
      params,
    }
  );

  return data;
};

export const downloadBatchTransactionFn = async ({
  batchReference,
}: {
  batchReference: string;
}) => {
  const { data } = await authenticatedApi().get(
    `/disbursement/download-transaction-batch?batchReference=${batchReference}`
  );

  return data;
};

export const getTransactionDetailFn = async ({
  transactionReference,
}: {
  transactionReference: string;
}) => {
  const { data } =
    await authenticatedApi().get<SingleTransactionDetailResponse>(
      `/disbursement?transactionReference=${transactionReference}`
    );

  return data;
};

export const removeTransactionFn = async ({ id }: { id: string }) => {
  const { data } = await authenticatedApi().delete<IBareResponse>(
    "/disbursement",
    {
      data: {
        id,
      },
    }
  );

  return data;
};

export const disburseFn = async ({
  batchReference,
}: {
  batchReference: string;
}) => {
  const { data } = await authenticatedApi().post<IBareResponse>(
    "/disbursement",
    {
      batchReference,
    }
  );

  return data;
};

export const requeryFn = async ({
  reference,
}: {
  reference: string;
}) => {
  const { data } = await authenticatedApi().get("/disbursement/status", {
    params: {
      reference,
    },
  });
  return data;
};
