import { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { useQueries } from "@tanstack/react-query";

import {
  DashboardLayout,
  EmptyContainer,
  ListLoader,
  Pagination,
  PrimaryButton,
  Title,
} from "@/components";
import {
  BatchTransactionsDetailsModal,
  UploadBatchModal,
  ViewJustUploadedBatch,
} from "@/modals";
import { AuthenticatedRoute, perPage } from "@/utils";
import {
  downloadBatchTransactionFn,
  getAllBatchListFn,
  getBatchTransactionDetailFn,
} from "@/services";
import { BatchTransactionType, UploadFileResponse, stateType } from "@/types";

// export type stateType = {
//   currentPage?: number;
//   download?: boolean;
//   approve?: boolean;
//   showPreviewToast?: boolean;
//   selected?: UploadFileResponse;
// };

const BulkTransactions = () => {
  const [selected, setSelected] = useState<any>({});
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [state, setState] = useState<stateType>({
    currentPage: 1,
    download: false,
    showPreviewToast: false,
    selected: undefined,
  });
  const [itemOffset, setItemOffset] = useState(0);

  const { currentPage } = state;

  const updateState = (payload: SetStateAction<stateType>) => {
    setState({ ...state, ...payload });
  };

  const [allBatchTransactionsData, batchTransactionDetailsData, downloadData] =
    useQueries({
      queries: [
        {
          queryKey: ["all batch list", state?.currentPage],
          queryFn: () =>
            getAllBatchListFn({
              currentPage,
              perPage,
            }),
        },
        {
          queryKey: ["batch transaction details", showDetailsModal, selected],
          queryFn: () =>
            getBatchTransactionDetailFn({
              id: selected?.id,
            }),
          enabled: !!selected?.id,
        },
        {
          queryKey: [
            "download batch transaction list",
            state?.download,
            selected?.batchReference,
          ],
          queryFn: () =>
            downloadBatchTransactionFn({
              batchReference: selected?.batchReference,
            }),
          enabled: state?.download,
        },
      ],
    });

  //download transactions report
  const handleDownload = () => {
    const blob = new Blob([downloadData?.data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transaction-report-batch-ref-${selected?.batchReference}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (downloadData.isSuccess && downloadData.data !== undefined)
      handleDownload();
    updateState({
      download: false,
    });
  }, [downloadData?.isSuccess, downloadData.data]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    const newOffset =
      (selected * perPage) %
      (allBatchTransactionsData?.data?.data?.totalRecords ?? 0);
    setItemOffset(newOffset);
    updateState({
      currentPage: selected + 1,
    });
  };

  const renderContent = () => {
    if (allBatchTransactionsData.isFetching) {
      return <ListLoader />;
    }

    if (allBatchTransactionsData?.isError) {
      return (
        <EmptyContainer
          text1="Error fetching transactions"
          actionTitle="Refetch transactions"
          action={allBatchTransactionsData?.refetch}
        />
      );
    }

    if (allBatchTransactionsData?.data?.data?.batchTransactions?.length === 0) {
      return (
        <EmptyContainer
          text1="No bulk transaction yet"
          text2="Effortlessly manage large volumes of transactions with our 
          intuitive bulk transaction feature. Simplify your workload and save time while 
          ensuring accuracy and efficiency."
          actionTitle="Upload New Batch"
          action={() => setShowUploadModal(true)}
        />
      );
    }

    if (allBatchTransactionsData?.data?.data)
      return (
        <>
          {allBatchTransactionsData?.data?.data?.batchTransactions?.map(
            (transaction: BatchTransactionType, index: number) => {
              return (
                <div
                  onClick={() => {
                    setSelected(transaction);
                    setShowDetailsModal(true);
                  }}
                  key={index}
                  className="h-12 w-full text-light-text text-[12px] flex items-center px-[30px] justify-between cursor-pointer"
                >
                  <p className="w-[30%]">{transaction?.batchReference}</p>
                  <p className="w-[20%] text-primary-wine">
                    {transaction?.batchName || "N/A"}
                  </p>
                  <p className="w-[15%] lowercase">
                    {transaction?.createdAt
                      ? format(new Date(transaction?.createdAt), "dd-MM-yyyy p")
                      : "N/A"}
                  </p>
                  <div className="w-[15%] flex gap-x-1 items-center">
                    <div
                      className={`rounded-[50%] h-[10px] w-[10px] ${
                        transaction?.status === "NEW"
                          ? "bg-light-text"
                          : "bg-[#FB9701]"
                      }`}
                    />
                    <p
                      className={`capitalize ${
                        transaction?.status === "NEW"
                          ? "text-light-text"
                          : "text-[#FB9701]"
                      }`}
                    >
                      {transaction?.status?.toLowerCase()}
                    </p>
                  </div>
                </div>
              );
            }
          )}

          <Pagination
            totalRecords={allBatchTransactionsData?.data?.data?.totalRecords}
            currentItems={
              allBatchTransactionsData?.data?.data?.batchTransactions
            }
            itemOffset={itemOffset}
            pageCount={Math.ceil(
              allBatchTransactionsData?.data?.data?.totalRecords / perPage
            )}
            handlePageClick={handlePageClick}
            forcePage={allBatchTransactionsData?.data?.data?.currentPage - 1}
          />
        </>
      );
  };

  return (
    <>
      <Title name="Bulk Transactions" />
      <DashboardLayout pageName="Bulk Transactions">
        <div className="bg-[#FBFCFF]">
          <div className="flex justify-end items-center">
            {/* <div className="bg-inherit border border-primary-black/30 flex items-center px-2 gap-x-2 h-10 rounded-[3px] w-[30%]">
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

            <div className="flex items-center gap-x-4">
              {/* <PrimaryButton
                title="Download Template"
                bgColor="bg-[#FFEFF4] text-[#802530]"
              /> */}
              <div className="flex gap-x-2 items-center rounded-[3px] bg-primary-wine py-[12px] px-4 cursor-pointer relative">
                <div
                  onClick={() => setShowUploadModal(true)}
                  className="flex gap-x-2 items-center rounded-[3px]  cursor-pointer relative"
                >
                  <Image
                    src="/icons/upload-icon.svg"
                    alt="upload icon"
                    width={20}
                    height={20}
                  />
                  <p className="text-white text-sm">Upload Batch</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white mt-[33px]">
            <div className="flex justify-between items-center px-[30px] py-[20px]">
              <p className="text-[#471C2A] text-[15px] font-InterTight-Medium">
                Bulk Transactions
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
            <div className="bg-light-wine h-10 w-full uppercase text-[#303030] text-[12px] flex items-center px-[30px] justify-between">
              <p className="w-[30%]">batch reference</p>
              <p className="w-[20%]">batch name</p>
              <p className="w-[15%]">time</p>
              <p className="w-[15%]">status</p>
            </div>

            <div>{renderContent()}</div>
          </div>
        </div>
      </DashboardLayout>
      <BatchTransactionsDetailsModal
        showModal={showDetailsModal}
        closeModal={() => setShowDetailsModal(false)}
        updateState={updateState}
        batchTransactionDetailsData={batchTransactionDetailsData}
        downloadData={downloadData}
      />
      <UploadBatchModal
        showModal={showUploadModal}
        closeModal={() => setShowUploadModal(false)}
        updateState={updateState}
      />
      <ViewJustUploadedBatch
        state={state}
        showModal={state?.showPreviewToast || false}
        closeModal={() =>
          updateState({
            showPreviewToast: false,
          })
        }
        updateState={updateState}
        setShowDetailsModal={setShowDetailsModal}
        setSelected={setSelected}
      />
    </>
  );
};

export default AuthenticatedRoute(BulkTransactions);
