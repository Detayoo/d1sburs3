import { useState } from "react";
import Image from "next/image";

import { ModalContainer, OTPField, PrimaryButton } from "@/components";
import { formatMoney } from "@/utils";

export const MakeSettlementModal = ({
  showModal,
  closeModal,
  stage,
  setStage,
}: {
  showModal: boolean;
  closeModal: () => void;
  stage: string;
  setStage: (state: string) => void;
}) => {
  const [walletType, setWalletType] = useState("");
  const [amount, setAmount] = useState("");
  const [code, setCode] = useState("");

  const renderContent = () => {
    switch (stage) {
      case "wallet-selection":
        return (
          <div>
            <div className="flex justify-between items-center">
              <p className="text-[16px] font-Onest-Medium">
                Select Wallet To Send From
              </p>
              <Image
                onClick={closeModal}
                src="/icons/close-modal-icon.svg"
                alt="close modal icon"
                width={16}
                height={16}
                className="cursor-pointer"
              />
            </div>

            <div
              onClick={() => {
                setWalletType("NGN");
                setStage("enter-amount");
              }}
              className="flex items-center mt-10 mb-5 bg-white gap-[15px] cursor-pointer"
            >
              <Image
                width={40}
                height={40}
                alt="currency"
                src="/icons/naira.svg"
              />
              <div className="flex flex-col gap-y-1">
                <p className="text-sm font-Onest-Medium">Nigerian Naira</p>
                <p className="text-[13px]">NGN</p>
              </div>
              <div className="flex flex-col gap-y-1 ml-auto text-right">
                <p className="text-sm font-Onest-Medium">
                  NGN {formatMoney("2313454568189")}
                </p>
                <p className="text-[13px]">Wallet Balance</p>
              </div>
            </div>
            <div
              onClick={() => {
                setWalletType("USD");
                setStage("enter-amount");
              }}
              className="flex items-center border-t pt-[30px] border-t-border-gray border-dashed bg-white gap-[15px] cursor-pointer"
            >
              <Image
                width={40}
                height={40}
                alt="currency"
                src="/icons/dollar.svg"
              />
              <div className="flex flex-col gap-y-1">
                <p className="text-sm font-Onest-Medium">
                  United States Dollar
                </p>
                <p className="text-[13px]">USD</p>
              </div>
              <div className="flex flex-col gap-y-1 ml-auto text-right">
                <p className="text-sm font-Onest-Medium">
                  USD {formatMoney("68189.2")}
                </p>
                <p className="text-[13px]">Wallet Balance</p>
              </div>
            </div>
          </div>
        );
      case "enter-amount":
        return (
          <div>
            <p className="font-Onest-Medium text-base">
              Enter a portion of the total amount you want to withdraw
            </p>
            <p className="mt-7 text-[13px]">Amount</p>
            <div className="border border-border-gray mt-[6px] flex items-center rounded-[4px] h-12 pl-[20px] gap-x-5">
              <p>{walletType}</p>
              <div className="w-[1px] h-full bg-border-gray"></div>
              <input
                value={amount}
                onChange={(e: any) => setAmount(e.target.value)}
                type="number"
                placeholder="Enter amount"
                className="flex-1 h-full outline-none placeholder:text-[#D9D9D9]"
              />
            </div>
            <PrimaryButton
              onClick={() => setStage("confirm-transaction")}
              title="Proceed"
              disabled={!amount}
              className="mt-[30px] w-full rounded-[5px]"
            />
            <p
              onClick={() => setStage("wallet-selection")}
              className="mt-5 text-center cursor-pointer"
            >
              Go back
            </p>
          </div>
        );
      case "confirm-transaction":
        return (
          <div>
            <div className="flex items-center justify-between w-full">
              <Image
                onClick={() => setStage("enter-amount")}
                className="cursor-pointer"
                src="/icons/back-icon.svg"
                alt="return icon"
                height={45}
                width={45}
              />
              <p className="text-base font-Onest-Medium">Confirm Transaction</p>
              <p className="invisible">Hey</p>
            </div>

            <div className="py-[30px] px-[15px] mt-5 rounded-[10px] bg-white drop-shadow shadow-[#ABABAB26]">
              <p className="text-center text-base text-primary-wine font-Onest-SemiBold">
                {walletType} {formatMoney(amount)}
              </p>
              <p className="text-[12px] text-center mt-[10px]">
                8 Jan, 2024 - 04:34 PM
              </p>
              <div className="flex flex-col divide-y mt-4">
                <div className="flex justify-between text-[12px] py-4">
                  <p>Settlement Name</p>
                  <p className="uppercase font-Onest-Medium">
                    Tunde Idris Rilwan
                  </p>
                </div>
                <div className="flex justify-between text-[12px] py-4">
                  <p>Account Number</p>
                  <p className="font-Onest-Medium">1234567890</p>
                </div>
                <div className="flex justify-between text-[12px] pt-4">
                  <p>Settlement Bank</p>
                  <p className="font-Onest-Medium">Guaranty Trust Bank</p>
                </div>
              </div>
            </div>

            <PrimaryButton
              onClick={() => setStage("enter-pin")}
              className="text-sm mt-[30px] w-full rounded-[5px]"
              title={`Settle ${walletType}${formatMoney(amount)}`}
            />
          </div>
        );
      case "enter-pin":
        return (
          <div className="flex flex-col w-[80%] mx-auto items-center">
            <Image
              src="/icons/transaction-pin-icon.svg"
              alt="pin icon"
              width={80}
              height={80}
            />

            <p className="text-[20px] font-Onest-Medium mt-7">
              Enter Transaction Pin
            </p>

            <p className="text-sm mt-5 text-center">
              Enter your private 4-digit PIN to secure your transaction
            </p>

            <div className="mx-auto mt-7">
              <OTPField
                code={code}
                onChange={setCode}
                length={4}
                type="password"
              />
            </div>

            <PrimaryButton
              onClick={() => setStage("transaction-status")}
              title="Continue"
              className="mt-10 w-full rounded-[10px]"
              disabled={code?.length !== 4}
            />

            {/* <p onClick={() => setStage("transaction-status")}>

            </p> */}
          </div>
        );
      case "transaction-status":
        return (
          <div className="flex flex-col w-[80%] mx-auto items-center">
            <Image
              src="/icons/successful.gif"
              alt="successful transaction icon"
              width={100}
              height={100}
            />

            <p className="text-sm mt-7 text-center">
              Your account has been settled successfully
            </p>

            <PrimaryButton
              title="Done"
              className="mt-10 w-full rounded-[10px]"
              onClick={closeModal}
            />

            {/* <p onClick={() => setStage("transaction-status")}>

            </p> */}
          </div>
        );
      default:
        break;
    }
  };
  return (
    <ModalContainer showModal={showModal} closeModal={closeModal}>
      <div
        className={`absolute z-50 min-w-[28rem]  max-h-[75%] rounded-[10px] bg-white ${
          showModal
            ? "opacity-100 visible mt-0"
            : "opacity-0 invisible mt-[5rem]"
        } animation overflow-y-auto`}
      >
        <div className="bg-white text-sm z-[100] py-[35px] px-[20px]">
          {renderContent()}
        </div>
      </div>
    </ModalContainer>
  );
};
