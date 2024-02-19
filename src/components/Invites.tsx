export const Invites = () => {
  return (
    <div>
      <div className="bg-light-wine h-10 w-full uppercase text-[#303030] text-[12px] flex items-center px-[20px] justify-between">
        <p className="w-[15%]">date & time</p>
        <p className="w-[25%]">full name</p>
        <p className="w-[25%]">email address</p>
        <p className="w-[20%]">status</p>
      </div>
      <div className="bg-white h-12 w-full text-[#303030] text-[12px] flex items-center px-[20px] justify-between">
        <p className="w-[15%]">12-08-2023 02:24pm</p>
        <p className="w-[25%] capitalize">Lordshibby Suprememarshal</p>
        <p className="w-[25%]">lordshibbysuprememarshal@gmail.com</p>
        <p className="w-[20%] uppercase">
          <span
            className={`text-center bg-[#F9F4FF] py-2 px-6 rounded-full text-primary-wine`}
          >
            invited
          </span>
        </p>
      </div>
    </div>
  );
};
