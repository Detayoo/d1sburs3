import Image from "next/image";

import { ModalContainer, PrimaryButton } from "@/components";
import { formatMoney } from "@/helpers";

export const SettlementDetailsModal = ({
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
            <p className="text-[20px]">Transaction Summary</p>
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
            <p>Date and Time</p>
            <div className="font-Onest-Medium flex flex-col gap-y-[11px] text-right">
              <p>28th August 2023</p>
              <p className="uppercase">4:59 pm</p>
            </div>
          </div>
          <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
            <p>Currency Name</p>
            <div className="flex items-center gap-[5px] text-right">
              <Image
                width={24}
                height={24}
                alt="currency"
                src="/icons/naira.svg"
              />

              <p>NGN</p>
            </div>
          </div>
          <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
            <p>Settlement Account</p>
            <div className="font-Onest-Medium flex flex-col gap-y-[11px] text-right">
              <p className="uppercase">Ayobami Walters</p>
              <p>First bank | 1234567890</p>
            </div>
          </div>
          <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
            <p>Amount</p>
            <p className="uppercase font-Onest-Medium">
              &#8358;{formatMoney("1200000")}
            </p>
          </div>
          <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
            <p>Transaction Charge</p>
            <p className="uppercase font-Onest-Medium">
              &#8358;{formatMoney("1000")}
            </p>
          </div>
          <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
            <p>Transaction Type</p>
            <p className="uppercase font-Onest-Medium">Card Transfer</p>
          </div>
          <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
            <p>Transaction Ref.</p>
            <div className="flex gap-x-2">
              <p className="uppercase font-Onest-Medium">JWT123561276 </p>
              <Image width={11} height={12} alt="copy" src="/icons/copy.svg" />
            </div>
          </div>
          <PrimaryButton
            title="Download Receipt"
            className="mt-[100px] w-full"
          />
        </div>
      </div>
    </ModalContainer>
  );
};
