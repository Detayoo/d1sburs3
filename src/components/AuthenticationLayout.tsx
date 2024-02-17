import React from "react";
import Image from "next/image";
import Router from "next/router";

export const AuthenticationLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full bg-white flex justify-between items-center h-screen px-[40px] py-[40px]">
      <div className="w-[44%] flex flex-col h-full">
        <div
          onClick={() => Router.push("/login")}
          className="flex gap-[10px] items-center justify-self-start cursor-pointer"
        >
          <Image
            src="/icons/stripestack-logo.svg"
            alt="stripestack logo"
            width={50}
            height={50}
          />
          <p className="font-Onest-SemiBold text-[24px] text-primary-wine">
            stripestack
          </p>
        </div>

        <div className="ml-[70px] mt-6 flex-1 flex flex-col justify-center">
          {children}
        </div>
      </div>
      <div className="flex justify-center items-center bg-deep-green w-[45%] h-full rounded-[20px] py-40">
        <Image
          src="/images/stripestack-large-logo.png"
          alt="stripestack image"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};
