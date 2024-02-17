import {
  DashboardLayout,
  PrimaryButton,
  Title,
  Invites,
  Users,
} from "@/components";
import { useState } from "react";

const Teams = () => {
  const [activeTab, setActiveTab] = useState("users");
  const tabs = ["users", "invites"];
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

      <div className="flex border-b border-b-[#D7D7D7]">
        {tabs.map((tab) => (
          <p
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-[120px] capitalize border-b-[2px] pb-[11px] text-sm text-center self-end cursor-pointer ${
              activeTab === tab
                ? "border-b-primary-wine text-primary-wine font-[500]"
                : "border-b-transparent text-[#5D5D5D]"
            }`}
          >
            {tab}
          </p>
        ))}

        <PrimaryButton title="+ Invite Teams" className="ml-auto" />
      </div>
      {renderBody()}
    </DashboardLayout>
  );
};

export default Teams;
