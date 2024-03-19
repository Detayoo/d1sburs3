import Image from "next/image";

import { ModalContainer } from "@/components";
// import { stateType } from "@/pages/bulk-transactions";
import { stateType } from "@/types";

export const ViewJustUploadedBatch = ({
  showModal = true,
  closeModal,
  state,
  updateState,
  setShowDetailsModal,
  setSelected,
}: {
  showModal: boolean;
  state: stateType;
  closeModal: () => void;
  updateState: (state: stateType) => void;
  setShowDetailsModal: (state: boolean) => void;
  setSelected: (state: any) => void;
}) => {
  return (
    <ModalContainer showModal={showModal} closeModal={closeModal}>
      <div
        className={`absolute z-[100] w-[372px] h-[80px] top-[4rem] rounded-[4px] bg-white flex ${
          showModal ? "right-[1rem]" : "right-[-10rem]"
        } animation overflow-hidden`}
      >
        <div className="w-[48px] bg-[#DDF7E0]  h-full flex justify-center items-center">
          <Image
            src="/icons/success-icon.svg"
            alt="success icon"
            width={24}
            height={24}
          />
        </div>

        <div className="flex-1 flex justify-between p-4">
          <div className="">
            <p className="text-[#471C2A] text-sm font-InterTight-Medium">
              Batch Upload Successful
            </p>
            {/* <p className="text-[#948D90] text-sm mt-1">
              Your batch import successful.
            </p> */}
            <button
              type="button"
              onClick={() => {
                updateState({
                  showPreviewToast: false,
                });
                setSelected(state?.selected?.data);
                setTimeout(() => {
                  setShowDetailsModal(true);
                }, 500);
              }}
              className="text-[#31C440] mt-1 text-sm cursor-pointer"
            >
              View Transaction Details
            </button>
          </div>
          <Image
            onClick={() => {
              updateState({
                showPreviewToast: false,
              });
            }}
            src="/icons/close-modal-icon.svg"
            alt="close modal icon"
            width={13}
            height={13}
            className="cursor-pointer self-start"
          />
        </div>
      </div>
    </ModalContainer>
  );
};
