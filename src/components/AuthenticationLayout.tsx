import React from "react";
import Image from "next/image";

export const AuthenticationLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  
  return (
    <div className="w-full bg-white flex items-center h-screen">
      <div className="flex flex-col w-[50%] h-full">
        <div className="py-4">
          <Image
            className="ml-[100px]"
            width={125}
            height={50}
            alt="logo"
            src="/images/logo.png"
          />
        </div>
        <div className="relative flex-1 h-full w-full self-stretch">
          <Image src="/images/auth-picture.png" alt="" layout="fill" />
        </div>
      </div>
      <div className="w-[50%] flex flex-col h-full justify-center px-[100px]">
        {children}
      </div>
    </div>
  );
};
