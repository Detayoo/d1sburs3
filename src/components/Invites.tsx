import { format } from "date-fns";
import { useState } from "react";

import { EmptyContainer, ListLoader, Pagination } from ".";
import { perPage } from "@/utils";
export const Invites = ({
  inviteListData,
  state,
  updateState,
  setShowInviteModal,
}) => {
  const STATUS_OBJ = {
    isUsed: "bg-[#F9F4FF] text-primary-wine",
    isUnused: "bg-primary-wine opacity-50 text-white",
    isRevoked: "bg-primary-wine text-white",
  };

  const [itemOffset, setItemOffset] = useState(0);

  const handlePageClick = ({ selected }) => {
    const newOffset = (selected * perPage) % state?.meta?.total;
    setItemOffset(newOffset);
    updateState({
      page: selected + 1,
    });
  };

  const { totalInvites, currentPage, invites } =
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
    return (
      <>
        {invites?.map((data) => {
          const { firstName, lastName, email } = data?.profile || {};
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
              <p className="w-[25%] capitalize">{firstName + " " + lastName}</p>
              <p className="w-[25%]">{email}</p>
              <button
                onClick={() => {
                  updateState({ selectedInvite: data });
                  setShowInviteModal(true);
                }}
                type="button"
                className="w-[20%] uppercase"
              >
                <span
                  className={`text-center py-2 px-6 rounded-full ${
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
              </button>
            </div>
          );
        })}

        <Pagination
          currentItems={invites}
          handlePageClick={handlePageClick}
          itemOffset={itemOffset}
          pageCount={Math.ceil(totalInvites / perPage)}
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
        <p className="w-[25%]">full name</p>
        <p className="w-[25%]">email address</p>
        <p className="w-[20%]">status</p>
      </div>
      {renderContent()}
    </div>
  );
};
