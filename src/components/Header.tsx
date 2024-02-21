import Image from "next/image";

export const Header = ({ pageName }) => {
  return (
    <div className="w-full bg-white flex items-center justify-between sticky left-0 top-0 h-[70px] px-[30px] pt-[23px] pb-[13px]">
      <div>
        <p className="text-[20px]">{pageName}</p>
      </div>

      <div className="flex gap-[10px] items-center">
        <div className="w-[40px] h-[40px] bg-light-wine rounded-[50%] flex justify-center items-center text-primary-wine">
          AO
        </div>
        <div className="">
          <p className="text-[14px]">Ayodeji Emmanuel</p>
          <p className="text-black/60 text-[12px]">ayodejiemmanuel@gmail.com</p>
        </div>
        <Image
          src="/icons/down-chevron.svg"
          alt="chevron icon"
          width={20}
          height={20}
          className="ml-[14px]"
        />
      </div>
    </div>
  );
};
