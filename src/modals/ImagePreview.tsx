import React from "react";
import Image from "next/image";

import { ModalContainer } from "@/components";

export const ImagePreview = ({
  showModal,
  closeModal,
  previewImage,
}: {
  showModal: boolean;
  closeModal: () => void;
  previewImage: string;
}) => {
  return (
    <ModalContainer showModal={showModal} closeModal={closeModal}>
      <>
        <div
          className={`w-[450px] z-40 absolute  left-[50%] translate-x-[-50%] px-[30px] py-[80px] translate-y-[-50%]  delay-300 animation border border-[#1E73FF80] bg-[#E5EFFF] ${
            showModal ? "top-[50%]" : "top-[60%]"
          } `}
        >
          <Image
            onClick={closeModal}
            src="/icons/close-modal-icon.svg"
            alt="close"
            width={16}
            height={16}
            className="cursor-pointer absolute top-[30px] right-[25px]"
          />

          <Image
            width={260}
            height={381}
            alt="img"
            src={previewImage}
            className="mx-auto w-[260px] h-auto"
          />
        </div>
      </>
    </ModalContainer>
  );
};
