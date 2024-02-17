import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import { routes } from "@/helpers/routes";
import Link from "next/link";

export const Sidebar = () => {
  const pathname = usePathname();
  const ActiveLink = (href: string) => pathname.startsWith(href);
  return (
    <div className="w-[20%] h-full flex flex-col bg-white">
      <div className="w-full h-[90px] flex justify-center items-center">
        <Image
          className="mt-11 mx-auto"
          width={125}
          height={50}
          alt="logo"
          src="/images/logo.png"
        />
      </div>

      <div className="px-[30px] flex-1 mt-[60px] flex flex-col">
        <div className="flex flex-col gap-[18px]">
          {routes?.map((each, index) => (
            <Link
              className={`flex items-center gap-[20px] overflow-hidden relative px-[20px] rounded-[5px] py-[12px] ${
                ActiveLink(each?.url) ? "bg-primary-wine" : ""
              }`}
              key={index}
              href={each?.url}
            >
              <div
                className={`w-[4px] h-full absolute left-0 top-0 ${
                  ActiveLink(each?.url) ? "bg-primary-wine" : ""
                } `}
              ></div>

              <Image
                width={21}
                height={21}
                src={`${
                  ActiveLink(each?.url) ? each?.activeIcons : each?.icon
                }`}
                alt="icon"
              />
              <p
                className={`text-[13px] ${
                  ActiveLink(each?.url) ? "text-white" : "text-primary-wine"
                }`}
              >
                {each?.name}
              </p>
            </Link>
          ))}
        </div>

        <div className="border-t border-[#E7E7E7] py-[30px] px-[20px] mt-[76px]">
          <div className="flex cursor-pointer items-center gap-[15px]">
            <Image
              width={20}
              height={20}
              alt="logout"
              src="/icons/logout.svg"
            />

            <p className="text-[14px] text-primary-wine">Log Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};
