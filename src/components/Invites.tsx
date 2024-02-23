import { format } from "date-fns";
import { useState } from "react";
import {
  UseQueryResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";

import { EmptyContainer, ListLoader, Pagination, PrimaryButton } from ".";
import { extractAppServerError, perPage, STATUS_OBJ } from "@/utils";
import { revokeInviteFn } from "@/services";
import { IInvitesListResponse, Invite, InviteStateType } from "@/types";
export const Invites = ({
  inviteListData,
  state,
  updateState,
  setShowInviteModal,
}: {
  inviteListData: UseQueryResult<IInvitesListResponse | any>;
  state: InviteStateType;
  updateState: ({}) => void;
  setShowInviteModal: (state: boolean) => void;
}) => {
  const queryClient = useQueryClient();

  const [itemOffset, setItemOffset] = useState(0);
  const [revokedId, setRevokedId] = useState("");

  const handlePageClick = ({ selected }: { selected: number }) => {
    const newOffset = (selected * perPage) % state?.meta?.total;
    setItemOffset(newOffset);
    updateState({
      page: selected + 1,
    });
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: revokeInviteFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["invites list"] });
      queryClient.invalidateQueries({ queryKey: ["users list"] });
      toast.success(data?.message);
    },
    onError: (error) =>
      toast.error(
        extractAppServerError(
          error,
          "Could not revoke invite, please try again"
        )
      ),
  });

  const handleRevokeInvite = async (userId: string) => {
    setRevokedId(userId);
    try {
      await mutateAsync({
        id: userId,
      });
    } catch (error) {}
  };

  const {
    totalInvites,
    invites,
  }: { totalInvites: number | undefined; invites: Invite } =
    inviteListData?.data?.data || {};

  const renderContent = () => {
    if (inviteListData?.isFetching) {
      return <ListLoader />;
    }

    if (inviteListData?.isError) {
      return (
        <EmptyContainer
          text1="Error fetching Invites List"
          actionTitle="Refetch Invites List"
          action={inviteListData?.refetch}
        />
      );
    }

    if (inviteListData?.data?.data?.invites?.length === 0) {
      return <EmptyContainer text1="No Invite Found" />;
    }

    return (
      <>
        {inviteListData?.data?.data?.invites?.map((data: Invite) => {
          const { firstName, lastName, middleName, email } =
            data?.profile || {};
          return (
            <div
              key={data?.id}
              className="bg-white h-12 w-full text-[#303030] text-[12px] flex items-center px-[20px] justify-between"
            >
              <p className="w-[15%] lowercase">
                {data?.createdAt
                  ? format(new Date(data?.createdAt), "dd-MM-yyyy p")
                  : "-"}
              </p>
              <p className="w-[20%] capitalize">
                {firstName + " " + (middleName || "") + " " + lastName}
              </p>
              <p className="w-[20%]">{email}</p>
              <div
                onClick={() => {
                  if (data?.isUsed) return;
                  updateState({ selectedInvite: data });
                  setShowInviteModal(true);
                }}
                className="w-[15%] uppercase"
              >
                <span
                  className={`text-center py-2 px-6 rounded-full cursor-pointer ${
                    data?.isUsed
                      ? STATUS_OBJ["isUsed"]
                      : data?.isRevoked
                      ? STATUS_OBJ["isUnused"]
                      : !data?.isUsed
                      ? STATUS_OBJ["isUnused"]
                      : ""
                  }`}
                >
                  {data?.isUsed ? "Invited" : "Resend Invite"}
                </span>
              </div>

              <div className="w-[10%] flex justify-center items-center">
                {!(data?.isUsed || data?.isRevoked) && (
                  <PrimaryButton
                    loading={isPending && revokedId === data?.profile?.id}
                    disabled={isPending && revokedId === data?.profile?.id}
                    onClick={() => handleRevokeInvite(data?.profile?.id)}
                    title="Revoke"
                    className="h-8 rounded-full"
                    type="button"
                  />
                )}
              </div>
            </div>
          );
        })}

        <Pagination
          currentItems={invites}
          handlePageClick={handlePageClick}
          itemOffset={itemOffset}
          pageCount={Math.ceil((totalInvites ?? 1) / perPage)}
          totalRecords={totalInvites}
          forcePage={inviteListData?.data?.data?.currentPage - 1}
        />
      </>
    );
  };

  return (
    <div>
      <div className="bg-light-wine h-10 w-full uppercase text-[#303030] text-[12px] flex items-center px-[20px] justify-between">
        <p className="w-[15%]">date & time</p>
        <p className="w-[20%]">full name</p>
        <p className="w-[20%]">email address</p>
        <p className="w-[15%]">status</p>
        <p className="w-[10%]" />
      </div>
      {renderContent()}
    </div>
  );
};
