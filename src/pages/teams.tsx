import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  DashboardLayout,
  PrimaryButton,
  Title,
  Invites,
  Users,
} from "@/components";
import { InviteTeamMember } from "@/modals";

const Teams = () => {
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
  const renderBody = () => {
    switch (activeTab) {
      case "invites":
        return <Invites />;
      default:
        return <Users />;
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

        <PrimaryButton
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
      </div>
      <div className="mt-9">{renderBody()}</div>

      <InviteTeamMember
        showModal={showInviteModal}
        closeModal={() => setShowInviteModal(false)}
      />
    </DashboardLayout>
  );
};

export default Teams;
