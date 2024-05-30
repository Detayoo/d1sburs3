import { useEffect, useRef } from "react";
import Image from "next/image";
import { format } from "date-fns";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import {
  UseQueryResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  EmptyContainer,
  ListLoader,
  ModalContainer,
  PrimaryButton,
} from "@/components";
import { extractAppServerError, formatMoney, handleScrollToTop } from "@/utils";
import { SingleTransactionDetailResponse } from "@/types";
import { requeryFn } from "@/services";

export const TransactionsDetailsModal = ({
  showModal,
  closeModal,
  transactionDetailsData,
}: {
  showModal: boolean;
  closeModal: () => void;
  transactionDetailsData: UseQueryResult<SingleTransactionDetailResponse>;
}) => {
  const modalRef = useRef(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    handleScrollToTop(modalRef);
  }, [showModal]);

  const {
    accountName,
    accountNumber,
    amount,
    bank,
    dateTime,
    narration,
    reasons,
    status,
    transactionReference,
  } = transactionDetailsData?.data?.data?.transactions[0] || {};

  const { mutateAsync, isPending } = useMutation({
    mutationFn: requeryFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["batch transaction details"],
      });
      queryClient.invalidateQueries({
        queryKey: ["batch transaction list"],
      });
    },
    onError: (error) =>
      toast.error(
        extractAppServerError(
          error,
          "Could not complete requery, please try again"
        )
      ),
  });

  const handleRequery = async () => {
    try {
      await mutateAsync({
        reference: transactionReference,
      });
    } catch (error) {}
  };

  const renderModalContent = () => {
    if (transactionDetailsData?.isFetching)
      return (
        <div className="w-full h-screen flex justify-center items-center">
          <ListLoader />
        </div>
      );

    if (transactionDetailsData?.isError) {
      return (
        <div className="w-fulll h-screen flex justify-center items-center">
          <EmptyContainer
            text1="Error fetching transaction details"
            actionTitle="Refetch transaction details"
            action={transactionDetailsData?.refetch}
          />
        </div>
      );
    }

    return (
      <div className="pt-[70px] pb-[30px] px-[25px] bg-white text-sm z-[100]">
        <div className="flex justify-between items-center mb-[60px]">
          <p className="text-[20px]">Transaction Details</p>
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
          <p>Transaction Reference</p>
          <CopyToClipboard
            text={transactionReference}
            onCopy={() => toast.success("Copied successfully")}
          >
            <div className="flex gap-x-2">
              <p className="font-InterTight-Medium">{transactionReference}</p>

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
          <p>Account Name</p>
          <p className="font-InterTight-Medium capitalize">
            {accountName?.toLowerCase() || "-"}
          </p>
        </div>
        <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
          <p>Account Number</p>
          <p className="font-InterTight-Medium">{accountNumber}</p>
        </div>
        <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
          <p>Bank Name</p>
          <p className="uppercase font-InterTight-Medium">{bank}</p>
        </div>
        <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
          <p>Amount</p>
          <p className="font-InterTight-Medium">
            &#8358;{formatMoney(amount || 0)}
          </p>
        </div>

        <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
          <p>Status</p>
          <div className="flex gap-x-1 items-center">
            <div
              className={`rounded-[50%] h-[10px] w-[10px] ${
                status === "READY" || status === "SUCCESSFUL"
                  ? "bg-light-green"
                  : status?.toLowerCase() === "pending"
                  ? " bg-[#FB9701]"
                  : "bg-failure-text"
              }`}
            />
            <p
              className={`capitalize ${
                status === "READY" || status === "SUCCESSFUL"
                  ? "text-light-green"
                  : status?.toLowerCase() === "pending"
                  ? " text-[#FB9701]"
                  : "text-failure-text"
              }`}
            >
              {status?.toLowerCase()}
            </p>
          </div>
        </div>

        <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
          <p>Narration</p>
          <p className="font-InterTight-Medium">{narration}</p>
        </div>
        {reasons?.length > 0 && (
          <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
            <p>Reason(s)</p>
            <p className="max-w-[60%] text-right">
              {reasons[reasons?.length - 1]}
            </p>
          </div>
        )}

        <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
          <p>Date & Time</p>

          <p className="lowercase font-InterTight-Medium">
            {dateTime ? format(new Date(dateTime), "dd-MM-yyyy p") : "N/A"}
          </p>
        </div>

        <PrimaryButton
          disabled={isPending}
          loading={isPending}
          title="Re-query"
          onClick={handleRequery}
          className="mt-10 w-full"
        />
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
