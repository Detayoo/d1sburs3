import Image from "next/image";

import { ModalContainer, PrimaryButton } from "@/components";

export const BatchTransactionsDetailsModal = ({
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
            <p>Batch Name</p>
            <p className="font-Onest-Medium">Batch 24152</p>
          </div>
          <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray w-full">
            <p className="w-[60%]">Total No. of Successful Transactions</p>
            <p className="uppercase font-Onest-Medium">40</p>
          </div>
          <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
            <p className="w-[60%]">Total No. of Failed Transactions</p>
            <p className="uppercase font-Onest-Medium">40</p>
          </div>
          <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
            <p className="w-[60%]">Total No. of Transactions</p>
            <p className="uppercase font-Onest-Medium">80</p>
          </div>
          <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
            <p>Initiated By</p>
            <p className="capitalize font-Onest-Medium">Abbey Lanre</p>
          </div>
          <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
            <p>Approved By</p>
            <p className="capitalize font-Onest-Medium">Shonubi Lanre</p>
          </div>
          <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
            <p>Initiation Time</p>
            <p className="">12-08-2023 02:24pm</p>
          </div>
          <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
            <p>Time of Approval</p>
            <p className="">12-08-2023 04:24pm</p>
          </div>

          <PrimaryButton
            title="Download Report"
            className="mt-[60px] w-full border border-primary-wine"
          />
          <PrimaryButton
            title="See Transactions List"
            className="mt-4 w-full bg-white border border-primary-wine"
            textColor="text-primary-wine"
          />
        </div>
      </div>
    </ModalContainer>
  );
};
