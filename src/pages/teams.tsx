import Image from "next/image";
import { useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";

import {
  DashboardLayout,
  PrimaryButton,
  Title,
  Invites,
  Users,
  FilterComponent,
} from "@/components";
import { InviteTeamMember } from "@/modals";
import { AuthenticatedRoute, perPage } from "@/utils";
import { getInviteListFn, getUsersListFn } from "@/services";
import { useAuth } from "@/contexts";

const Teams = () => {
  const { user } = useAuth();
  const getField = () => {
    if (typeof window !== "undefined" && localStorage) {
      const tab = localStorage.getItem("TEAMS-TAB");
      if (tab) return { tab };
      else return { tab: "users" };
    } else {
      return { tab: "users" };
    }
  };

  useEffect(() => {
    const { tab } = getField();
    setActiveTab(tab);
  }, []);

  const [activeTab, setActiveTab] = useState("");
  const tabs = ["users", "invites"];
  const [showInviteModal, setShowInviteModal] = useState(false);

  const [state, setState] = useState({
    invites: [],
    meta: {
      total: 0,
    },
    page: 1,
    users: [],
    userMeta: {
      total: 0,
    },
    userPage: 1,
    filterModal: false,
    selectedInvite: {},
  });

  const updateState = (payload: any) => {
    setState({ ...state, ...payload });
  };
  const [selected, setSelected] = useState("");

  const [inviteListData, usersListData] = useQueries({
    queries: [
      {
        queryKey: ["invites list", state?.page],
        queryFn: () =>
          getInviteListFn({
            currentPage: state?.page,
            perPage,
          }),
      },
      {
        queryKey: ["users list", state?.userPage, selected],
        queryFn: () =>
          getUsersListFn({
            currentPage: state?.userPage,
            perPage,
            role: selected,
          }),
      },
    ],
  });

  useEffect(() => {
    updateState({
      invites: inviteListData?.data?.data?.invites,
      meta: {
        total: inviteListData?.data?.data?.totalInvites,
      },
    });
  }, [activeTab, state?.page]);

  useEffect(() => {
    updateState({
      users: usersListData?.data?.data?.users,
      userMeta: {
        total: usersListData?.data?.data?.totalUsers,
      },
    });
  }, [
    usersListData?.data?.data?.currentPage,
    usersListData?.data?.data?.totalUsers,
    activeTab,
  ]);

  console.log(state?.filterModal);

  const renderBody = () => {
    switch (activeTab) {
      case "invites":
        return (
          <Invites
            inviteListData={inviteListData}
            state={state}
            updateState={updateState}
            setShowInviteModal={setShowInviteModal}
          />
        );

      default:
        return (
          <Users
            usersListData={usersListData}
            parentState={state}
            updateParentState={updateState}
          />
        );
    }
  };

  return (
    <DashboardLayout pageName="Teams">
      <Title name="Teams" />

      <div className="flex border-b border-b-[#D7D7D7] mt-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              localStorage.setItem("TEAMS-TAB", tab);
              setActiveTab(tab);
            }}
            className={`w-[120px] capitalize border-b-[2px] pb-[11px] text-sm text-center self-end cursor-pointer ${
              activeTab === tab
                ? "border-b-primary-wine text-primary-wine font-InterTight-Medium"
                : "border-b-transparent text-[#5D5D5D]"
            }`}
          >
            {tab}
          </button>
        ))}

        <div className="flex gap-x-3 items-center ml-auto">
          <div
            onClick={() =>
              updateState({
                filterModal: true,
              })
            }
            className="px-[20px] py-[12px] flex gap-x-2 items-center bg-[#FFEFF4] rounded-[3px]  cursor-pointer relative "
          >
            <Image
              src="/icons/filter-icon.svg"
              alt="filter icon"
              width={16}
              height={16}
            />
            <p className="text-sm text-[#471C2A]">Filter by</p>

            <Image
              src="/icons/wine-chevron.svg"
              alt="chevron icon"
              width={16}
              height={16}
            />
            <FilterComponent
              selected={selected}
              // setCurrentPage={state?.userPage}
              setSelected={setSelected}
              closeModal={() =>
                updateState({
                  filterModal: false,
                })
              }
              showModal={state?.filterModal}
              className="top-0 left-0"
            />
          </div>

          {user?.role === "ADMIN" && (
            <PrimaryButton
              type="button"
              onClick={() => {
                setShowInviteModal(true);
              }}
              title={
                <div className="flex gap-x-2 items-center">
                  <Image
                    src="/icons/add.svg"
                    alt="add icon"
                    width={16}
                    height={16}
                  />
                  Invite Teams
                </div>
              }
              className="ml-auto"
            />
          )}
        </div>
      </div>
      <div className="mt-9">{renderBody()}</div>

      <InviteTeamMember
        showModal={showInviteModal}
        closeModal={() => setShowInviteModal(false)}
        selectedInvite={state?.selectedInvite}
      />
    </DashboardLayout>
  );
};

export default AuthenticatedRoute(Teams);
