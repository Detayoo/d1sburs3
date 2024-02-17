export const Header = ({ pageName }) => {
  return (
    <div className="w-full bg-white flex items-center justify-between sticky left-0 top-0 h-[70px] px-[30px] pt-[23px] pb-[13px]">
      <div>
        <p className="text-[20px] font-[500]">{pageName}</p>
      </div>

      <div className="flex gap-[20px]">
        <div className="w-[40px] h-[40px] bg-[#EBFFF7] rounded-[50%] flex justify-center items-center"></div>
      </div>
    </div>
  );
};
