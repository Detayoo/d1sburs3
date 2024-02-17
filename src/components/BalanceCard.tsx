import Image from "next/image";

export const BalanceCard = ({
  src,
  currency,
  moneyValue,
}: {
  src: string;
  currency: string;
  moneyValue: string;
}) => {
  return (
    <div className="py-[20px] px-[30px] border border-[#e5e5e5] w-[20rem] rounded-[10px]">
      <div className="flex items-center bg-white gap-[15px]">
        <Image width={40} height={40} alt="currency" src={src} />
        <p className="text-sm">{currency}</p>
      </div>

      <p className="mt-5  font-Onest-Medium text-[20px]">{moneyValue}</p>
    </div>
  );
};
