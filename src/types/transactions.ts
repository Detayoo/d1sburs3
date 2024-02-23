export interface UploadFileResponse {
  status: boolean;
  data: {
    id: string;
    batchReference: string;
    batchName: string;
    createdAt: string;
    status: string;
  };
}

export interface BatchTransactionDetailResponse {
  status: boolean;
  data: {
    id: string;
    batchName: string;
    batchReference: any;
    status: string;
    initiatorId: string;
    approverId: string | null;
    successfulTransactions: number | null;
    pendingTransactions: number | null;
    failedTransactions: number | null;
    transactions: number;
    approvalTime: null | string;
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
    initiator: {
      id: string;
      firstName: string;
      lastName: string;
      middleName: string;
    };
    approver: {
      id: string;
      firstName: string;
      lastName: string;
      middleName: string;
    };
  };
}

export type BatchTransactionType = {
  id: string;
  createdAt: string;
  batchReference: string;
  batchName: string;
  status: string;
};

export interface AllBatchTransactionsListResponse {
  status: boolean;
  data: {
    batchTransactions: BatchTransactionType[];
    totalRecords: number;
    perPage: number;
    currentPage: number;
  };
}

export type TransactionList = {
  id: string;
  dateTime: string;
  accountName: string;
  accountNumber: string;
  amount: number;
  bank: string;
  transactionReference: string;
  status: string;
  reasons: string[];
};

export interface BatchTransactionListResponse {
  status: boolean;
  data: {
    disbursements: TransactionList[];
    totalTransactions: number;
    perPage: number;
    currentPage: number;
  };
}

export interface SingleTransactionDetailResponse {
  status: boolean;
  data: {
    transaction: {
      id: string;
      transactionReference: any;
      accountName: string;
      accountNumber: string;
      bank: string;
      amount: number;
      status: string;
      dateTime: string;
    };
  };
}
