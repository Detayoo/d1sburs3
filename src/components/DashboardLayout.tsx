import React from "react";
import { Header, Sidebar } from ".";

export const DashboardLayout = ({
  children,
  pageName,
}: {
  children: React.ReactNode;
  pageName?: string;
}) => {
  return (
    <div className="w-full h-screen bg-[#FBFBFB] flex">
      <Sidebar />
      <div className="w-[80%] h-full flex z-[10] flex-col">
        <Header pageName={pageName} />
        <div className="w-full flex-1 overflow-y-auto p-[30px] bg-[#FBFCFF]">{children}</div>
      </div>
    </div>
  );
};
