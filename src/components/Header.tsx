import Image from "next/image";

import { useAuth } from "@/contexts";

export const Header = ({ pageName }: { pageName: string }) => {
  const { user } = useAuth();

  return (
    <div className="w-full bg-white flex items-center justify-between sticky left-0 top-0 h-[70px] px-[30px] pt-[23px] pb-[13px]">
      <div>
        <p className="text-[20px]">{pageName}</p>
      </div>

      <div className="flex gap-[10px] items-center">
        <div className="w-[40px] h-[40px] bg-light-wine rounded-[50%] flex justify-center items-center text-primary-wine">
          {user?.firstName?.charAt(0) + user?.lastName?.charAt(0)}
        </div>
        <div className="">
          <p className="text-[14px] capitalize">
            {user?.firstName?.toLowerCase() + " " + user?.lastName?.toLowerCase()}
          </p>
          <p className="text-[#00042D80] text-[12px]">{user?.email}</p>
          <p className="text-[10px] text-primary-wine capitalize">
            {user?.role?.toLowerCase() || ""}
          </p>
        </div>
        {/* <Image
          src="/icons/down-chevron.svg"
          alt="chevron icon"
          width={20}
          height={20}
          className="ml-[14px]"
        /> */}
      </div>
    </div>
  );
};
