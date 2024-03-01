import Image from "next/image";
import { useState } from "react";
import {
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { toast } from "react-toastify";

import { UpdateRoleModal } from "@/modals";
import { EmptyContainer, ListLoader, Pagination } from ".";
import { extractAppServerError, perPage } from "@/utils";
import { changeUsersPasswordFn, manageUserStatusFn } from "@/services";
import {
  InviteStateType,
  IUsersListResponse,
  Users as UsersType,
} from "@/types";

export const Users = ({
  usersListData,
  parentState,
  updateParentState,
}: {
  usersListData: UseQueryResult<IUsersListResponse>;
  parentState: InviteStateType;
  updateParentState: ({}) => void;
}) => {
  const queryClient = useQueryClient();

  const [state, setState] = useState({
    modal: false,
    changeRoleModal: false,
    selected: null,
  });

  const updateState = (payload: {
    modal?: boolean;
    changeRoleModal?: boolean;
    selected?: any;
  }) => {
    setState({ ...state, ...payload });
  };

  const [itemOffset, setItemOffset] = useState(0);

  const handlePageClick = ({ selected }: { selected: number }) => {
    const newOffset = (selected * perPage) % parentState?.userMeta?.total;
    setItemOffset(newOffset);
    updateParentState({
      userPage: selected + 1,
    });
  };

  const { mutateAsync: changeStatusAsync, isPending } = useMutation({
    mutationFn: manageUserStatusFn,
    onSuccess: (data) => {
      updateState({
        modal: false,
        selected: null,
      });
      toast.success(data?.message);
      queryClient.invalidateQueries({
        queryKey: ["users list"],
      });
    },
    onError: (error) =>
      toast.error(
        extractAppServerError(
          error,
          "Could not change user's status, try again"
        )
      ),
  });
  const {
    mutateAsync: changeUserPasswordAsync,
    isPending: changingUserPassword,
  } = useMutation({
    mutationFn: changeUsersPasswordFn,
    onSuccess: (data) => {
      updateState({
        selected: null,
        modal: false,
      });
      toast.success(data?.message);
    },
    onError: (error) =>
      toast.error(
        extractAppServerError(
          error,
          "Could not change user's status, try again"
        )
      ),
  });

  const handleChangePassword = async (userId: string) => {
    if (changingUserPassword) return;
    try {
      await changeUserPasswordAsync({
        userId,
      });
    } catch (error) {}
  };

  const handleDeactivation = async (user: UsersType) => {
    if (isPending) return;
    try {
      await changeStatusAsync({
        userId: user?.id,
        status: user?.status === "ACTIVATED" ? "DEACTIVATED" : "ACTIVATED",
      });
    } catch (error) {}
  };

  const renderContent = () => {
    if (usersListData?.isFetching) {
      return <ListLoader />;
    }

    if (usersListData?.isError) {
      return (
        <EmptyContainer
          text1="Error fetching Users"
          actionTitle="Refetch Users"
          action={usersListData?.refetch}
        />
      );
    }
    if (usersListData?.data?.data?.users?.length === 0) {
      return <EmptyContainer text1="No User Found" />;
    }

    return (
      <>
        {usersListData?.data?.data?.users?.map(
          (user: UsersType, index: number) => {
            return (
              <div
                key={user?.id}
                className="bg-white relative h-12 w-full text-[#303030] text-[12px] flex items-center px-[20px] justify-between"
              >
                <p className="w-[15%] break-words">{index + 1}</p>
                <p className="w-[15%] capitalize">{user?.firstName}</p>
                <p className="w-[15%] capitalize">{user?.lastName}</p>
                <p className="w-[20%]">{user?.email}</p>
                <p className="w-[15%] capitalize">
                  {user?.role?.toLowerCase()}
                </p>
                <p className="w-[15%] uppercase">
                  <span
                    className={`text-center py-2 px-6 rounded-full ${
                      user?.status === "ACTIVATED"
                        ? "bg-success-bg text-success-text"
                        : "bg-failure-bg text-failure-text "
                    }`}
                  >
                    {user?.status === "ACTIVATED" ? "active" : "inactive"}
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
                    {/* <p
                      onClick={() =>
                        updateState({
                          changeRoleModal: true,
                          modal: false,
                        })
                      }
                      className="cursor-pointer p-4 border-b"
                    >
                      Change Role
                    </p> */}
                    <p
                      onClick={() => {
                        handleDeactivation(user);
                      }}
                      className={`cursor-pointer p-4 ${
                        user?.status === "ACTIVATED"
                          ? "text-failure-text"
                          : "text-success-text"
                      }`}
                    >
                      {isPending
                        ? "Please wait..."
                        : user?.status === "ACTIVATED"
                        ? "Deactivate"
                        : "Activate"}
                    </p>
                    <p
                      onClick={() => handleChangePassword(user?.id)}
                      className="cursor-pointer border-t p-4"
                    >
                      {changingUserPassword
                        ? "Changing Password"
                        : "Change Password"}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
        )}

        <Pagination
          currentItems={parentState?.users}
          handlePageClick={handlePageClick}
          itemOffset={itemOffset}
          pageCount={Math.ceil(parentState?.userMeta?.total / perPage)}
          totalRecords={parentState?.userMeta?.total}
          forcePage={(usersListData?.data?.data?.currentPage ?? 1) - 1}
        />
      </>
    );
  };

  return (
    <div className="">
      <div className="bg-light-wine h-10 w-full uppercase text-[#303030] text-[12px] flex items-center px-[20px] justify-between">
        <p className="w-[15%]">serial no.</p>
        <p className="w-[15%]">first name</p>
        <p className="w-[15%]">last name</p>
        <p className="w-[20%]">email address</p>
        <p className="w-[15%]">role</p>
        <p className="w-[15%]">status</p>
        <p className="flex-1" />
      </div>
      {state?.modal && (
        <button
          type="button"
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
