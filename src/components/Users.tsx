import Image from "next/image";
import { useState } from "react";

import { UpdateRoleModal } from "@/modals";
export const Users = () => {
  const transactions = ["", "", "", ""];
  const [state, setState] = useState({
    modal: false,
    changeRoleModal: false,
    selected: {},
  });

  const updateState = (payload: any) => {
    setState({ ...state, ...payload });
  };
  return (
    <div className="">
      <div className="bg-light-wine h-10 w-full uppercase text-[#303030] text-[12px] flex items-center px-[20px] justify-between">
        <p className="w-[10%]">serial no</p>
        <p className="w-[18%]">first name</p>
        <p className="w-[18%]">last name</p>
        <p className="w-[20%]">email address</p>
        <p className="w-[15%]">roles</p>
        <p className="w-[15%]">status</p>
        <p className="flex-1" />
      </div>
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
      {transactions.map((transaction, index) => {
        return (
          <div
            key={index}
            className="bg-white relative h-12 w-full text-[#303030] text-[12px] flex items-center px-[20px] justify-between"
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
                    selected: index,
                  })
                }
                className="cursor-pointer"
                src="/icons/more.svg"
                alt="action icon"
                width={15}
                height={4}
              />
            </div>

            <div
              className={`absolute top-8 right-0 z-[50] rounded-[5px] bg-white text-[15px] w-[200px] flex flex-col ${
                state?.modal && state?.selected === index
                  ? "opacity-100 visible mt-0"
                  : "opacity-0 invisible mt-[5rem]"
              } animation`}
            >
              <div>
                <p
                  onClick={() =>
                    updateState({
                      changeRoleModal: true,
                      modal: false,
                    })
                  }
                  className="cursor-pointer p-4"
                >
                  Change Role
                </p>
                <p className="cursor-pointer p-4 border-t text-failure-text">
                  Deactivate
                </p>
              </div>
            </div>
          </div>
        );
      })}

      <UpdateRoleModal
        showModal={state?.changeRoleModal}
        closeModal={() =>
          updateState({
            changeRoleModal: false,
          })
        }
      />
    </div>
  );
};
