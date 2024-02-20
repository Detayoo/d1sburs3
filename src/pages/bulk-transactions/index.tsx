import { useState } from "react";
import Image from "next/image";
import Router from "next/router";

import {
  DashboardLayout,
  Pagination,
  PrimaryButton,
  Title,
  DateComponent,
} from "@/components";
import {
  BatchTransactionsDetailsModal,
  TransactionsDetailsModal,
} from "@/modals";

const transactions: any = ["", "", ""];

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState({});
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportObj, setExportObj] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleExport = () => {};

  return (
    <>
      <Title name="Bulk Transactions" />
      <DashboardLayout pageName="Bulk Transactions">
        <div className="bg-[#FBFCFF] py-6">
          <div className="flex justify-between items-center">
            <div className="bg-inherit border border-primary-black/30 flex items-center px-2 gap-x-2 h-10 rounded-[3px] w-[30%]">
              <Image
                src="/icons/search-icon.svg"
                alt="search icon"
                width={20}
                height={20}
              />
              <input
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
                type="text"
                className="bg-inherit flex-1 placeholder:text-sm placeholder:text-primary-black/70 text-sm text-primary-black outline-none"
                placeholder="Search by transaction reference"
              />
            </div>

            <div className="flex items-center gap-x-4">
              <PrimaryButton
                title="Download Template"
                bgColor="bg-[#FFEFF4] text-[#802530]"
              />
              <div className="flex gap-x-2 items-center rounded-[3px] bg-primary-wine py-[12px] px-4 cursor-pointer relative">
                <div className="flex gap-x-2 items-center rounded-[3px]  cursor-pointer relative">
                  <Image
                    src="/icons/upload-icon.svg"
                    alt="upload icon"
                    width={20}
                    height={20}
                  />
                  <p className="text-white text-sm">Upload Batch</p>
                  <div
                    className={`absolute top-10 right-0 w-[300px] bg-white z-30 py-8 px-6 rounded-[5px] border border-primary-black/10 animation ${
                      showExportModal
                        ? "opacity-100 visible mt-0"
                        : "opacity-0 invisible mt-5"
                    }`}
                  >
                    <div className="flex flex-col gap-y-6 w-full bg-inherit">
                      <div className="w-full">
                        <label
                          className={`inline-block text-[14px] text-subtext-black mb-1`}
                        >
                          Start Date
                        </label>
                        <DateComponent
                          selected={exportObj?.startDate}
                          name="startDate"
                          placeholder="DD/MM/YYYY"
                          format="dd/MM/yyyy"
                          onChange={(date: Date) => {
                            setExportObj({
                              ...exportObj,
                              startDate: date,
                            });
                          }}
                          maxDate={new Date()}
                        />
                      </div>

                      <div className="w-full">
                        <label
                          className={`inline-block text-[14px] text-subtext-black mb-1`}
                        >
                          End Date
                        </label>
                        <DateComponent
                          selected={exportObj?.endDate}
                          name="endDate"
                          placeholder="DD/MM/YYYY"
                          format="dd/MM/yyyy"
                          onChange={(date: Date) => {
                            setExportObj({
                              ...exportObj,
                              endDate: date,
                            });
                          }}
                          minDate={exportObj?.startDate}
                          maxDate={new Date()}
                        />
                      </div>
                      <PrimaryButton
                        title="Export"
                        className="h-10"
                        onClick={handleExport}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white mt-[33px]">
            <div className="flex justify-between items-center px-[30px] py-[20px]">
              <p className="text-primary-wine text-[15px]">Bulk Transaction</p>
              <div className="px-[20px] py-[12px] flex gap-x-2 items-center bg-[#FFEFF4] rounded-[3px]  cursor-pointer relative">
                <Image
                  src="/icons/filter-icon.svg"
                  alt="filter icon"
                  width={16}
                  height={16}
                />
                <p className="text-sm text-primary-wine">Filter by</p>

                <Image
                  src="/icons/chevron-icon.svg"
                  alt="chevron icon"
                  width={16}
                  height={16}
                />
              </div>
            </div>

            <div>
              <div className="bg-light-wine h-10 w-full uppercase text-[#303030] text-[12px] flex items-center px-[30px] justify-between">
                <p className="w-[30%]">batch reference</p>
                <p className="w-[20%]">file name</p>
                <p className="w-[15%]">time</p>
                <p className="w-[15%]">status</p>
              </div>
              {transactions?.map((transaction, index) => {
                return (
                  <div
                    // onClick={() => Router.push(`/bulk-transactions/${index}`)}
                    key={index}
                    className="h-12 w-full text-light-text text-[12px] flex items-center px-[30px] justify-between"
                  >
                    <p className="w-[30%]">6unx0q8e34a85izb6unx0q8e34v1sr</p>
                    <p className="w-[20%] text-primary-wine">
                      20_October_2024_ Batch.csv
                    </p>
                    <p className="w-[15%]">12-08-2023 02:24pm</p>
                    <div onClick={()=> setShowDetailsModal(true)} className="w-[15%] flex gap-x-1 items-center">
                      <div className="rounded-[50%] h-[10px] w-[10px] bg-light-text" />
                      <p>New</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Pagination
            totalRecords={5}
            currentItems={transactions}
            itemOffset={2}
            pageCount={5}
            handlePageClick={() => {}}
          />
        </div>
      </DashboardLayout>
      <BatchTransactionsDetailsModal
        showModal={showDetailsModal}
        closeModal={() => setShowDetailsModal(false)}
      />
    </>
  );
};

export default Transactions;
