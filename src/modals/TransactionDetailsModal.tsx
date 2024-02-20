import Image from "next/image";

import { ModalContainer, PrimaryButton } from "@/components";
import { formatMoney } from "@/utils";

export const TransactionsDetailsModal = ({
  showModal,
  closeModal,
}: {
  showModal: boolean;
  closeModal: () => void;
}) => {
  return (
    <ModalContainer showModal={showModal} closeModal={closeModal}>
      <div
        className={`absolute z-[100] w-[30rem] h-screen top-0 bg-white ${
          showModal ? "right-0" : "right-[-30rem]"
        } animation overflow-y-auto`}
      >
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
            <p>Transaction Ref.</p>
            <div className="flex gap-x-2">
              <p className="uppercase font-Onest-Medium">JWT123561276 </p>
              <Image
                width={11}
                height={12}
                alt="copy"
                src="/icons/copy-icon.svg"
              />
            </div>
          </div>

          <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
            <p>Account Name</p>
            <p className="uppercase font-Onest-Medium">Adedigba Peter</p>
          </div>
          <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
            <p>Account Number</p>
            <p className="uppercase font-Onest-Medium">1234567890</p>
          </div>
          <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
            <p>Bank Name</p>
            <p className="uppercase font-Onest-Medium">GTBANK</p>
          </div>
          <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
            <p>Amount</p>
            <p className="uppercase font-Onest-Medium">
              &#8358;{formatMoney("1200000")}
            </p>
          </div>

          <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
            <p>Status</p>
            <div className="flex gap-x-1 items-center">
              <div className="rounded-[50%] h-[10px] w-[10px] bg-light-green" />
              <p className="text-light-green">Approved</p>
            </div>
          </div>

          <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
            <p>Session ID</p>
            <p className="uppercase font-Onest-Medium">
              1000003465789445346345667724567345
            </p>
          </div>
          <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
            <p>Date & Time</p>

            <p className="">12-08-2023 02:24pm</p>
          </div>

          <PrimaryButton
            title="Download Transaction Details"
            className="mt-[100px] w-full"
          />
        </div>
      </div>
    </ModalContainer>
  );
};
