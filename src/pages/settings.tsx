import { useState } from "react";

import { ChangePassword, DashboardLayout, Profile } from "@/components";
const Settings = () => {
  const tabs = ["Profile", "Change Password"];
  const [activeTab, setActiveTab] = useState("Profile");

  const renderPage = () => {
    switch (activeTab) {
      case "Change Password":
        return <ChangePassword />;

      default:
        return <Profile />;
    }
  };

  return (
    <DashboardLayout pageName="Settings">
      <div className="py-[20px] px-[40px]">
        <p className="text-[22px] font-InterTight-Medium">Settings</p>
        <p className="text-[14px]">Manage your preferences</p>

        <div className="flex border-b border-b-[#D7D7D7] mt-10 gap-x-3">
          {tabs.map((tab) => (
            <p
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-[130px] capitalize border-b-[2px] pb-[11px] text-sm text-center self-end cursor-pointer ${
                activeTab === tab
                  ? "border-b-primary-wine text-primary-wine font-InterTight-Medium"
                  : "border-b-transparent text-[#5D5D5D]"
              }`}
            >
              {tab}
            </p>
          ))}
        </div>

        {renderPage()}
      </div>
    </DashboardLayout>
  );
};

export default Settings;
