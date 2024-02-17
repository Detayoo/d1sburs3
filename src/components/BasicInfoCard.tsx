import Image from "next/image";
import React from "react";

export const BasicInfoCard = ({
  title,
  flag,
  value,
  extraClasses,
}: {
  title: string;
  flag?: boolean;
  value: string;
  extraClasses?: string;
}) => {
  return (
    <div>
      <p className="font-[200] text-[12px] mb-[10px]">{title}</p>
      <div className="flex items-center gap-[9px]">
        {flag ? (
          <Image
            width={28}
            height={19}
            alt="flag"
            src="/icons/nigerian-flag.svg"
          />
        ) : (
          ""
        )}

        <p className={`text-[14px] ${extraClasses} font-[600]`}>{value}</p>
      </div>
    </div>
  );
};
