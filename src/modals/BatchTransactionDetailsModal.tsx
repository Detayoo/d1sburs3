import { useEffect, useRef } from "react";
import Image from "next/image";
import Router from "next/router";
import {
  UseQueryResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  EmptyContainer,
  ListLoader,
  ModalContainer,
  PrimaryButton,
} from "@/components";
import { extractAppServerError, handleScrollToTop } from "@/utils";
import { BatchTransactionDetailResponse, stateType } from "@/types";
import { declineBatchFn, disburseFn } from "@/services";
import { useAuth } from "@/contexts";

export const BatchTransactionsDetailsModal = ({
  showModal,
  closeModal,
  updateState,
  batchTransactionDetailsData,
  downloadData,
}: {
  showModal: boolean;
  closeModal: () => void;
  updateState: (state: stateType) => void;
  batchTransactionDetailsData: UseQueryResult<BatchTransactionDetailResponse>;
  downloadData: UseQueryResult<string>;
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    handleScrollToTop(modalRef);
  }, [showModal]);

  const {
    approvalTime,
    approver,
    batchName,
    batchReference,
    createdAt,
    failedTransactions,
    initiator,
    pendingTransactions,
    successfulTransactions,
    transactions,
    status,
  } = batchTransactionDetailsData?.data?.data || {};

  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { mutateAsync, isPending: approvalPending } = useMutation({
    mutationFn: disburseFn,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["all batch list"] });
      queryClient.invalidateQueries({
        queryKey: ["batch transaction details"],
      });
    },
    onError: (error) =>
      toast.error(
        extractAppServerError(
          error,
          "Could not approve transaction, please try again"
        )
      ),
  });
  const { mutateAsync: declineAsync, isPending: declinePending } = useMutation({
    mutationFn: declineBatchFn,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["all batch list"] });
      closeModal();
    },
    onError: (error) =>
      toast.error(
        extractAppServerError(
          error,
          "Could not decline transaction, please try again"
        )
      ),
  });

  const handleDisburse = async () => {
    try {
      await mutateAsync({
        batchReference,
      });
    } catch (error) {}
  };

  const handleDecline = async () => {
    try {
      await declineAsync({
        batchReference,
      });
    } catch (error) {}
  };

  const renderModalContent = () => {
    if (batchTransactionDetailsData?.isFetching) {
      return (
        <div className="h-screen w-full flex justify-center items-center">
          <ListLoader />
        </div>
      );
    }

    if (batchTransactionDetailsData?.isError) {
      return (
        <div className="w-fulll h-screen flex justify-center items-center">
          <EmptyContainer
            text1="Error fetching transaction details"
            actionTitle="Refetch transaction details"
            action={batchTransactionDetailsData?.refetch}
          />
        </div>
      );
    }

    return (
      <div className="pt-[70px] pb-[30px] px-[25px] bg-white text-sm z-[100]">
        <div className="flex justify-between items-center mb-[60px]">
          <p className="text-[20px]">Transaction Invoice</p>
          <Image
            onClick={closeModal}
            src="/icons/close-modal-icon.svg"
            alt="close modal icon"
            width={16}
            height={16}
            className="cursor-pointer"
          />
        </div>
        <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
          <p>Batch Reference</p>
          <CopyToClipboard
            text={batchReference}
            onCopy={() => toast.success("Copied successfully")}
          >
            <div className="flex gap-x-2 max-w-[70%] text-right">
              <p className="font-InterTight-Medium">{batchReference}</p>

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

        <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
          <p>Batch Name</p>
          <p className="font-InterTight-Medium max-w-[70%] text-right">
            {batchName}
          </p>
        </div>
        <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray w-full">
          <p className="w-[60%]">Total No. of Successful Transactions</p>
          <p className="uppercase font-InterTight-Medium">
            {successfulTransactions || 0}
          </p>
        </div>
        <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
          <p className="w-[60%]">Total No. of Failed Transactions</p>
          <p className="uppercase font-InterTight-Medium">
            {failedTransactions || 0}
          </p>
        </div>
        <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
          <p className="w-[60%]">Total No. of Pending Transactions</p>
          <p className="uppercase font-InterTight-Medium">
            {pendingTransactions || 0}
          </p>
        </div>
        <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
          <p className="w-[60%]">Total No. of Transactions</p>
          <p className="uppercase font-InterTight-Medium">
            {transactions || 0}
          </p>
        </div>
        <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
          <p>Initiated By</p>
          <p className="capitalize font-InterTight-Medium">
            {initiator
              ? (initiator?.firstName?.toLowerCase() || "") +
                " " +
                (initiator?.lastName?.toLowerCase() || "")
              : "N/A"}
          </p>
        </div>
        <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
          <p>Approved By</p>
          <p className="capitalize font-InterTight-Medium">
            {approver
              ? (approver?.firstName?.toLowerCase() || "") +
                " " +
                (approver?.lastName?.toLowerCase() || "")
              : "N/A"}
          </p>
        </div>
        <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
          <p>Initiation Time</p>
          <p className="font-InterTight-Medium">
            {createdAt ? format(new Date(createdAt), "dd-MM-yyyy p") : "N/A"}
          </p>
        </div>
        <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
          <p>Time of Approval</p>
          <p className="font-InterTight-Medium">
            {approvalTime
              ? format(new Date(approvalTime), "dd-MM-yyyy p")
              : "N/A"}
          </p>
        </div>

        <div className="mt-[50px]">
          {status === "NEW" && user?.role !== "INITIATOR" && (
            <div className="w-full flex gap-x-4 justify-between items-center">
              <PrimaryButton
                // loading={approvalPending}
                loading
                disabled={approvalPending}
                onClick={handleDisburse}
                title="Approve"
                className="w-[48%]"
              />
              <PrimaryButton
                // loading={declinePending}
                loading
                disabled={declinePending}
                onClick={handleDecline}
                title="Decline"
                className="w-[48%]"
                textColor="text-primary-wine"
                borderColor="border border-primary-wine"
                bgColor="bg-white"
              />
            </div>
          )}

          <PrimaryButton
            loading={downloadData.isFetching}
            disabled={downloadData.isFetching}
            onClick={() => {
              updateState({
                download: true,
              });
            }}
            type="button"
            title="Download Report"
            className="mt-4 w-full border border-primary-wine"
          />
          <PrimaryButton
            onClick={() => Router.push(`/bulk-transactions/${batchReference}`)}
            title="See Transactions List"
            className="mt-4 w-full bg-white border border-primary-wine"
            textColor="text-primary-wine"
          />
        </div>
      </div>
    );
  };

  return (
    <ModalContainer showModal={showModal} closeModal={closeModal}>
      <div
        ref={modalRef}
        className={`absolute z-[100] w-[30rem] h-screen top-0 bg-white ${
          showModal ? "right-0" : "right-[-30rem]"
        } animation overflow-y-auto`}
      >
        {renderModalContent()}
      </div>
    </ModalContainer>
  );
};
