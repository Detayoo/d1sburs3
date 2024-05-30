import { SetStateAction, useState } from "react";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import { format } from "date-fns";
import { useMutation, useQueries } from "@tanstack/react-query";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";

import {
  DashboardLayout,
  EmptyContainer,
  ListLoader,
  Pagination,
  Title,
} from "@/components";
import { TransactionsDetailsModal } from "@/modals";
import {
  AuthenticatedRoute,
  extractAppServerError,
  formatMoney,
  perPage,
} from "@/utils";
import {
  getBatchTransactionListFn,
  getTransactionDetailFn,
  removeTransactionFn,
} from "@/services";
import { stateType, TransactionList } from "@/types";

const Transactions = () => {
  const { id } = useRouter().query;

  const [selected, setSelected] = useState<any>({});
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [toBeRemoved, setToBeRemoved] = useState("");
  const [state, setState] = useState<stateType>({
    currentPage: 1,
    download: false,
  });
  const [itemOffset, setItemOffset] = useState(0);

  const updateState = (payload: SetStateAction<stateType>) => {
    setState({ ...state, ...payload });
  };

  const [batchTransactionData, transactionDetailsData] = useQueries({
    queries: [
      {
        queryKey: ["batch transaction list", state?.currentPage],
        queryFn: () =>
          getBatchTransactionListFn({
            currentPage: state?.currentPage,
            batchReference: id,
            perPage,
          }),
        enabled: !!id,
      },
      {
        queryKey: ["batch transaction details", selected?.id, showDetailsModal],
        queryFn: () =>
          getTransactionDetailFn({
            transactionReference: selected?.transactionReference,
          }),
        enabled: !!selected?.id,
      },
    ],
  });

  const handlePageClick = ({ selected }: { selected: number }) => {
    const newOffset =
      (selected * perPage) %
      (batchTransactionData?.data?.data?.totalTransactions ?? 0);
    setItemOffset(newOffset);
    updateState({
      currentPage: selected + 1,
    });
  };

  //remove transaction
  const { mutateAsync, isPending } = useMutation({
    mutationFn: removeTransactionFn,
    onSuccess: (data) => {
      batchTransactionData.refetch();
      toast.success(data?.message);
    },
    onError: (error) =>
      toast.error(
        extractAppServerError(
          error,
          "Could not remove transaction, please try again"
        )
      ),
  });

  const handleRemoveTransaction = async (transactionId: string) => {
    if (isPending) return;
    setToBeRemoved(transactionId);
    try {
      await mutateAsync({
        id: transactionId,
      });
    } catch (error) {
    } finally {
      setToBeRemoved("");
    }
  };

  const renderPageContent = () => {
    if (batchTransactionData.isFetching) {
      return <ListLoader />;
    }

    if (batchTransactionData?.isError) {
      return (
        <EmptyContainer
          text1="Error fetching transactions"
          actionTitle="Refetch transactions"
          action={batchTransactionData?.refetch}
        />
      );
    }

    if (batchTransactionData?.data?.data?.disbursements?.length === 0) {
      return <EmptyContainer text1="No transaction found" />;
    }

    if (batchTransactionData?.data?.data)
      return (
        <>
          {batchTransactionData?.data?.data?.disbursements?.map(
            (transaction: TransactionList, index: number) => {
              return (
                <div
                  key={transaction?.id}
                  className="h-12 w-full text-light-text text-[12px] flex items-center px-[30px] justify-between"
                >
                  <p className="w-[14%] lowercase">
                    {transaction?.dateTime
                      ? format(new Date(transaction?.dateTime), "dd-MM-yyyy p")
                      : "N/A"}
                  </p>
                  <p className="w-[15%] capitalize">
                    {transaction?.accountName?.toLowerCase()}
                  </p>
                  <p className="w-[15%]">{transaction?.accountNumber || "-"}</p>
                  <p className="w-[12%]">
                    &#8358;{formatMoney(transaction?.amount || 0)}
                  </p>

                  <p className="w-[20%] truncate">{transaction?.narration}</p>
                  <div className="w-[25%] flex gap-x-1">
                    <CopyToClipboard
                      text={transaction?.transactionReference}
                      onCopy={() => toast.success("Copied successfully")}
                    >
                      <div className="flex gap-x-2">
                        <p className="text-primary-wine break-words truncate">
                          {transaction?.transactionReference}
                        </p>

                        <Image
                          src="/icons/copy-icon.svg"
                          alt="copy icon"
                          width={12}
                          height={12}
                          className="cursor-pointer"
                        />
                      </div>
                    </CopyToClipboard>
                  </div>
                  <div className="w-[10%] flex gap-x-1 items-center ml-6">
                    <div
                      className={`rounded-[50%] h-[10px] w-[10px] ${
                        transaction?.status === "READY" ||
                        transaction?.status === "SUCCESSFUL"
                          ? "bg-light-green"
                          : transaction?.status?.toLowerCase() === "pending"
                          ? " bg-[#FB9701]"
                          : "bg-failure-text"
                      }`}
                    />
                    <p
                      className={`capitalize ${
                        transaction?.status === "READY" ||
                        transaction?.status === "SUCCESSFUL"
                          ? "text-light-green"
                          : transaction?.status?.toLowerCase() === "pending"
                          ? " text-[#FB9701]"
                          : "text-failure-text"
                      }`}
                    >
                      {transaction?.status?.toLowerCase()}
                    </p>
                  </div>
                  <p
                    onClick={() => {
                      setSelected(transaction);
                      setShowDetailsModal(true);
                    }}
                    className="w-[10%] underline text-primary-wine cursor-pointer ml-5 text-center"
                  >
                    View
                  </p>
                  {transaction?.status?.toLowerCase() === "skip" ||
                  transaction?.status?.toLowerCase() === "ready" ? (
                    <p
                      onClick={() => handleRemoveTransaction(transaction?.id)}
                      className="w-[5%] cursor-pointer"
                    >
                      {isPending && toBeRemoved == transaction?.id
                        ? "Removing"
                        : "Remove"}
                    </p>
                  ) : (
                    <p className="min-w-[5%]" />
                  )}
                </div>
              );
            }
          )}
          <Pagination
            totalRecords={batchTransactionData?.data?.data?.totalTransactions}
            currentItems={batchTransactionData?.data?.data?.disbursements}
            itemOffset={itemOffset}
            pageCount={Math.ceil(
              batchTransactionData?.data?.data?.totalTransactions / perPage
            )}
            handlePageClick={handlePageClick}
            forcePage={batchTransactionData?.data?.data?.currentPage - 1}
          />
        </>
      );
  };

  return (
    <>
      <Title name="Transactions" />
      <DashboardLayout pageName="Transactions">
        <button
          className="flex gap-x-1 items-center"
          onClick={() => Router.back()}
        >
          <Image
            src="/icons/wine-chevron.svg"
            alt="chevron icon"
            width={20}
            height={20}
            className="rotate-90"
          />
          <span className="text-primary-wine text-sm">Go back</span>
        </button>
        <div className="bg-[#FBFCFF] py-4">
          {/* <div className="bg-inherit border border-primary-black/30 flex items-center px-2 gap-x-2 h-10 rounded-[3px] w-[30%] mb-[30px]">
            <Image
              src="/icons/search-icon.svg"
              alt="search icon"
              width={20}
              height={20}
            />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              className="bg-inherit flex-1 placeholder:text-sm placeholder:text-primary-black/70 text-sm text-primary-black outline-none"
              placeholder="Search by transaction reference"
            />
          </div> */}
          <div className="bg-white">
            <div className="flex justify-between items-center px-[30px] py-[20px]">
              <p className="text-[#471C2A] text-[15px] font-InterTight-Medium">
                Transactions
              </p>
              {/* <div className="px-[20px] py-[12px] flex gap-x-2 items-center bg-[#FFEFF4] rounded-[3px]  cursor-pointer relative">
                <Image
                  src="/icons/filter-icon.svg"
                  alt="filter icon"
                  width={16}
                  height={16}
                />
                <p className="text-sm text-[#471C2A]">Filter by</p>

                <Image
                  src="/icons/wine-chevron.svg"
                  alt="chevron icon"
                  width={16}
                  height={16}
                />
              </div> */}
            </div>

            <div>
              <div className="bg-light-wine h-10 w-full uppercase text-[#303030] text-[12px] flex items-center px-[30px] justify-between">
                <p className="w-[14%]">date & time</p>
                <p className="w-[15%]">account name</p>
                <p className="w-[15%]">account no</p>
                <p className="w-[12%]">amount</p>
                <p className="w-[20%]">Narration</p>
                <p className="w-[25%]">transaction ref.</p>
                <p className="w-[10%] ml-6">status</p>
                <p className="w-[10%] ml-4 text-center">action</p>
                <p className="min-w-[5%]" />
              </div>
            </div>
          </div>

          {renderPageContent()}
        </div>
      </DashboardLayout>

      <TransactionsDetailsModal
        transactionDetailsData={transactionDetailsData}
        showModal={showDetailsModal}
        closeModal={() => setShowDetailsModal(false)}
      />
    </>
  );
};

export default AuthenticatedRoute(Transactions);
