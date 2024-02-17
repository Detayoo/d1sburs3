import React from "react";
import { ModalContainer } from "../components/ModalContainer";
import Image from "next/image";
import Link from "next/link";

export const CompleteOnboarding = ({
  showModal,
  closeModal,
}: {
  showModal: boolean;
  closeModal: () => void;
}) => {
  return (
    <ModalContainer showModal={showModal} closeModal={closeModal}>
      <div
        className={`w-[30rem] bg-black text-white rounded-[20px] animation ${
          showModal ? "mt-0" : "mt-[5rem]"
        } relative z-[100] px-[30px] py-[50px]`}
      >
        <div
          className="absolute top-[36px] right-[20px] cursor-pointer"
          onClick={closeModal}
          onKeyDown={() => {}}
        >
          <Image src="/icons/close-white.svg" alt="" width={30} height={30} />
        </div>

        <Image
          width={100}
          height={100}
          alt="kyc verification"
          src="/icons/verified.png"
          className="mx-auto"
        />

        <p className="my-[30px] text-center text-[24px]">KYC Submitted</p>

        <p className="text-[14px] text-center mb-[20px]">
          Your business KYC information has been submitted and will be reviewed
          shortly. Proceed to pay for your setup fee
        </p>

        <Link
          className="block text-[14px] text-primary-black text-center border bg-white py-[14px]  rounded-[40px]"
          href="#"
        >
          Pay for setup fee
        </Link>
      </div>
    </ModalContainer>
  );
};
