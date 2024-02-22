import Image from "next/image";

import { PrimaryButton } from ".";

export const EmptyContainer = ({
  text1,
  text2,
  actionTitle,
  action,
}: {
  text1: string;
  text2?: string;
  actionTitle?: string;
  action?: any;
}) => {
  return (
    <div className="py-[70px] 2xl:py-[200px] w-full flex flex-col justify-center items-center">
      <Image
        src="/icons/empty-folder.svg"
        width={96}
        height={92}
        alt="empty folder icon"
      />
      <p className="mt-[30px] text-[#471C2A] font-InterTight-Medium">{text1}</p>
      <p className="text-[#948D90] w-[425px] mt-5 text-center text-[13px]">
        {text2}
      </p>
      {actionTitle && (
        <PrimaryButton title={actionTitle} className="mt-5" onClick={action} />
      )}
    </div>
  );
};
