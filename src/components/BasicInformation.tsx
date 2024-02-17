import React from "react";
import { BasicInfoCard } from ".";

export const BasicInformation = () => {
  return (
    <div>
      <div className="mt-[20px] px-[40px] bg-white rounded-[10px] py-[30px] pb-[130px]">
        <div className="w-[70%] flex justify-between flex-wrap gap-y-[50px]">
          <div className="w-[33%]">
            <BasicInfoCard title="FIRST NAME" value="Ayobami" />
          </div>

          <div className="w-[33%]">
            <BasicInfoCard title="LAST NAME" value="Walters" />
          </div>

          <div className="w-[33%]">
            <BasicInfoCard
              title="EMAIL ADDRESS"
              value="ayobamiwalters@gmail.com"
            />
          </div>

          <div className="w-[33%]">
            <BasicInfoCard title="BUSINESS NAME" value="Black Rock Bet" />
          </div>

          <div className="w-[33%]">
            <BasicInfoCard title="PHONE NUMBER" flag value="+2348102345678" />
          </div>

          <div className="w-[33%]">
            <BasicInfoCard
              title="SETUP FEE"
              extraClasses="text-[#EA4435]"
              value="NOT YET PAID"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
