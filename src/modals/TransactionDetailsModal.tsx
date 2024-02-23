import { useEffect, useRef } from "react";
import Image from "next/image";
import { format } from "date-fns";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";

import {
  EmptyContainer,
  ListLoader,
  ModalContainer,
  PrimaryButton,
} from "@/components";
import { formatMoney, handleScrollToTop } from "@/utils";
import { UseQueryResult } from "@tanstack/react-query";
import { SingleTransactionDetailResponse } from "@/types";

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

  useEffect(() => {
    handleScrollToTop(modalRef);
  }, [showModal]);

  const {
    accountName,
    accountNumber,
    amount,
    bank,
    dateTime,
    id,
    status,
    transactionReference,
  } = transactionDetailsData?.data?.data?.transaction || {};

  const renderModalContent = () => {
    if (transactionDetailsData?.isFetching)
      return (
        <div className="w-fulll h-screen flex justify-center items-center">
          <ListLoader />
        </div>
      );

    if (transactionDetailsData?.isError) {
      return (
        <EmptyContainer
          text1="Error fetching transaction details"
          actionTitle="Refetch transaction details"
          action={transactionDetailsData?.refetch}
        />
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
          <p>Batch Reference</p>
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
            {accountName?.toLowerCase()}
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
            <div className="rounded-[50%] h-[10px] w-[10px] bg-light-green" />
            <p className="text-light-green capitalize">
              {status?.toLowerCase()}
            </p>
          </div>
        </div>

        <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
          <p>Date & Time</p>

          <p className="lowercase font-InterTight-Medium">
            {dateTime ? format(new Date(dateTime), "dd-MM-yyyy p") : "N/A"}
          </p>
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
