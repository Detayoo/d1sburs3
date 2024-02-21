import Image from "next/image";
import { useState } from "react";

import { UpdateRoleModal } from "@/modals";
import { ListLoader, Pagination } from ".";
import { excerpt, perPage } from "@/utils";
export const Users = ({ usersListData, parentState, updateParentState }) => {
  const [state, setState] = useState({
    modal: false,
    changeRoleModal: false,
    selected: {},
  });

  const updateState = (payload: any) => {
    setState({ ...state, ...payload });
  };

  console.log(parentState, "parent");

  const [itemOffset, setItemOffset] = useState(0);

  const handlePageClick = ({ selected }) => {
    const newOffset = (selected * perPage) % parentState?.userMeta?.total;
    setItemOffset(newOffset);
    updateParentState({
      userPage: selected + 1,
    });
  };

  const renderContent = () => {
    if (usersListData?.isFetching) {
      return <ListLoader />;
    }
    return (
      <>
        {parentState?.users?.map((user, index) => {
          return (
            <div
              key={user?.id}
              className="bg-white relative h-12 w-full text-[#303030] text-[12px] flex items-center px-[20px] justify-between"
            >
              <p className="w-[10%] break-words">{excerpt(user?.id, 12)}</p>
              <p className="w-[18%]">{user?.firstName}</p>
              <p className="w-[18%]">{user?.lastName}</p>
              <p className="w-[20%]">{user?.email}</p>
              <p className="w-[15%]">{user?.role}</p>
              <p className="w-[15%] uppercase">
                <span
                  className={`text-center py-2 px-6 rounded-full ${
                    user?.isActive
                      ? "bg-success-bg text-success-text"
                      : "bg-failure-bg text-failure-text "
                  }`}
                >
                  {user?.isActive ? "active" : "inactive"}
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

        <Pagination
          currentItems={parentState?.users}
          handlePageClick={handlePageClick}
          itemOffset={itemOffset}
          pageCount={Math.ceil(parentState?.userMeta?.total / perPage)}
          totalRecords={parentState?.userMeta?.total}
          forcePage={itemOffset}
        />
      </>
    );
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

      {renderContent()}

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
