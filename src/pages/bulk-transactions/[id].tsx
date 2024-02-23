import { SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { format } from "date-fns";
import { useQueries } from "@tanstack/react-query";

import {
  DashboardLayout,
  EmptyContainer,
  ListLoader,
  Pagination,
  Title,
} from "@/components";
import { TransactionsDetailsModal } from "@/modals";
import { AuthenticatedRoute, formatMoney, perPage } from "@/utils";
import { getBatchTransactionListFn, getTransactionDetailFn } from "@/services";
import { stateType } from ".";
import { TransactionList } from "@/types";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";

const BulkTransactions = () => {
  const { id } = useRouter().query;
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<any>({});
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportObj, setExportObj] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleExport = () => {};

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
            id: selected?.id,
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
                  key={index}
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
                  <div className="w-[28%] flex gap-x-1 break-words">
                    <CopyToClipboard
                      text={transaction?.transactionReference}
                      onCopy={() => toast.success("Copied successfully")}
                    >
                      <div className="flex gap-x-2">
                        <p className="text-primary-wine break-words">
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
                  <div className="w-[10%] flex gap-x-1 items-center">
                    <div className="rounded-[50%] h-[10px] w-[10px] bg-light-green" />
                    <p className="text-light-green capitalize">
                      {transaction?.status?.toLowerCase() || "-"}
                    </p>
                  </div>
                  <p
                    onClick={() => {
                      setSelected(transaction);
                      setShowDetailsModal(true);
                    }}
                    className="w-[10%] underline text-primary-wine text-right cursor-pointer"
                  >
                    View
                  </p>
                </div>
              );
            }
          )}
          <Pagination
            totalRecords={batchTransactionData?.data?.data?.totalTransactions}
            currentItems={batchTransactionData?.data?.data?.totalTransactions}
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
        <div className="bg-[#FBFCFF] py-4">
          <div className="bg-white">
            <div className="flex justify-between items-center px-[30px] py-[20px]">
              <p className="text-[#471C2A] text-[15px] font-InterTight-Medium">
                Transactions
              </p>
              <div className="px-[20px] py-[12px] flex gap-x-2 items-center bg-[#FFEFF4] rounded-[3px]  cursor-pointer relative">
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
              </div>
            </div>

            <div>
              <div className="bg-light-wine h-10 w-full uppercase text-[#303030] text-[12px] flex items-center px-[30px] justify-between">
                <p className="w-[14%]">date & time</p>
                <p className="w-[15%]">account name</p>
                <p className="w-[15%]">account no</p>
                <p className="w-[12%]">amount</p>
                <p className="w-[28%]">transaction ref.</p>
                <p className="w-[10%]">status</p>
                <p className="w-[10%] text-right">action</p>
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

export default AuthenticatedRoute(BulkTransactions);
