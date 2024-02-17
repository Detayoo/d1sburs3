import Image from "next/image";
import { useState } from "react";

export const Users = () => {
  const transactions = ["", ""];
  const [state, setState] = useState({
    modal: false,
  });

  const updateState = (payload: any) => {
    setState({ ...state, ...payload });
  };
  return (
    <div>
      <div className="bg-light-wine h-10 w-full uppercase text-[#303030] text-[12px] flex items-center px-[20px] justify-between">
        <p className="w-[10%]">serial no</p>
        <p className="w-[18%]">first name</p>
        <p className="w-[18%]">last name</p>
        <p className="w-[20%]">email address</p>
        <p className="w-[15%]">roles</p>
        <p className="w-[15%]">status</p>
        <p className="flex-1" />
      </div>
      {transactions.map((transaction, index) => {
        return (
          <div
            key={index}
            className="bg-white h-12 w-full text-[#303030] text-[12px] flex items-center px-[20px] justify-between"
          >
            <p className="w-[10%]">{index + 1}</p>
            <p className="w-[18%]">Adedigba</p>
            <p className="w-[18%]">Adetayo</p>
            <p className="w-[20%]">adedigba@gmail.com</p>
            <p className="w-[15%]">Admin</p>
            <p className="w-[15%] uppercase">
              <span
                className={`text-center bg-success-bg py-2 px-6 rounded-full text-success-text`}
              >
                active
              </span>
            </p>
            <div className="flex-1">
              <Image
                onClick={() =>
                  updateState({
                    modal: true,
                  })
                }
                className="cursor-pointer"
                src="/icons/more.svg"
                alt="action icon"
                width={15}
                height={4}
              />

              {state?.modal && (
                <div
                  onClick={() =>
                    updateState({
                      modal: false,
                    })
                  }
                  className="fixed top-0 right-0 z-10 w-full h-screen bg-black/50"
                />
              )}
              <div
                className={`absolute top-[17rem] right-16 z-[100] rounded-[5px] bg-white text-[15px]  w-[200px] flex flex-col ${
                  state?.modal
                    ? "opacity-100 visible mt-0"
                    : "opacity-0 invisible mt-[5rem]"
                } animation overflow-y-auto`}
              >
                <p className="cursor-pointer p-4">Change Role</p>
                <p className="cursor-pointer p-4 border-t text-failure-text">Deactivate</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
