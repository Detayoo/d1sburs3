import React from "react";
import { ModalContainer } from "../components/ModalContainer";
import Image from "next/image";
import Link from "next/link";

export const KYCPrompt = ({
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
          src="/icons/kyc.png"
        />

        <p className="my-[30px] w-[221px] text-[24px]">
          Complete your KYC Verification
        </p>

        <p className="text-[12px] text-primary-wine mb-[20px]">
          THIS WILL ENABLE YOU
        </p>

        <div className="flex flex-col gap-[20px] mb-[40px]">
          <div className="flex items-center gap-[10px]">
            <Image
              src="/icons/bag.svg"
              width={24}
              height={24}
              alt="send money"
            />

            <p className="text-[12px]">Receive money globally</p>
          </div>

          <div className="flex items-center gap-[10px] ">
            <Image
              src="/icons/switch.svg"
              width={24}
              height={24}
              alt="send money"
            />

            <p className="text-[12px]">
              Switch between different payment options
            </p>
          </div>
        </div>

        <Link
          className="block text-[14px] text-center border border-[#FFFFFF40] py-[14px] bg-[#FFFFFF12] rounded-[40px]"
          href="/onboarding"
        >
          Begin KYC Verification
        </Link>
      </div>
    </ModalContainer>
  );
};
