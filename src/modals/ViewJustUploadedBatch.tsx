import { ModalContainer } from "@/components";

export const ViewJustUploadedBatch = ({
  showModal,
  closeModal,
}: {
  showModal?: boolean;
  closeModal: () => void;
}) => {
  return (
    <ModalContainer showModal={showModal} closeModal={closeModal}>
      <div
        className={`absolute z-[100] min-w-[30rem] max-h-[85%] rounded-[10px] bg-white ${
          showModal
            ? "opacity-100 visible mt-0"
            : "opacity-0 invisible mt-[5rem]"
        } animation overflow-y-auto`}
      >
        <div className="bg-white text-sm py-[60px] px-[30px]"></div>
      </div>
    </ModalContainer>
  );
};
