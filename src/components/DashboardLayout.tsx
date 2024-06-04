import React, { useEffect, useRef } from "react";

import { Header, Sidebar } from ".";
import { handleScrollToTop } from "@/utils";

export const DashboardLayout = ({
  children,
  pageName,
  pagination,
}: {
  children: React.ReactNode;
  pageName: string;
  pagination?: number;
}) => {
  const bodyRef = useRef();

  useEffect(() => {
    if (pagination) handleScrollToTop(bodyRef);
  }, [pagination]);
  return (
    <div className="w-full h-screen bg-[#FBFBFB] flex">
      <Sidebar />
      <div className="w-[80%] h-full flex z-[10] flex-col">
        <Header pageName={pageName} />
        <div
          ref={bodyRef}
          className="w-full flex-1 overflow-y-auto p-[30px] bg-[#FBFCFF]"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
