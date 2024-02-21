import { useState } from "react";
import Image from "next/image";

import { DashboardLayout, Pagination, Title } from "@/components";
import { TransactionsDetailsModal } from "@/modals";
import { AuthenticatedRoute, formatMoney } from "@/utils";

const transactions: any = ["", "", ""];

const BulkTransactions = () => {
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
      <Title name="Transactions" />
      <DashboardLayout pageName="Transactions">
        <div className="bg-[#FBFCFF] py-4">
          <div className="bg-white">
            <div className="flex justify-between items-center px-[30px] py-[20px]">
              <p className="text-[#471C2A] text-[15px] font-InterTight-Medium">
                Transactions
              </p>
              <div className="px-[20px] py-[12px] flex gap-x-2 items-center bg-[#FFEFF4] rounded-[3px]  cursor-pointer relative">
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
              </div>
            </div>

            <div>
              <div className="bg-light-wine h-10 w-full uppercase text-[#303030] text-[12px] flex items-center px-[30px] justify-between">
                <p className="w-[14%]">date & time</p>
                <p className="w-[15%]">account name</p>
                <p className="w-[15%]">account no</p>
                <p className="w-[12%]">amount</p>
                <p className="w-[28%]">transaction ref.</p>
                <p className="w-[10%]">status</p>
                <p className="w-[10%] text-right">action</p>
              </div>
              {transactions?.map((transaction, index) => {
                return (
                  <div
                    key={index}
                    className="h-12 w-full text-light-text text-[12px] flex items-center px-[30px] justify-between"
                  >
                    <p className="w-[14%]">12-08-2023 02:24pm</p>
                    <p className="w-[15%] capitalize">Ayomide Babalola</p>
                    <p className="w-[15%]">0123456718</p>
                    <p className="w-[12%]">&#8358;{formatMoney("450000")}</p>
                    <div className="w-[28%] flex gap-x-1 break-words">
                      <p className="text-primary-wine">
                        JWQ45230987199QHJIS765SGSVBJ67
                      </p>
                      <Image
                        src="/icons/copy-icon.svg"
                        alt="copy icon"
                        width={12}
                        height={12}
                        className="cursor-pointer"
                      />
                    </div>
                    <div className="w-[10%] flex gap-x-1 items-center">
                      <div className="rounded-[50%] h-[10px] w-[10px] bg-light-green" />
                      <p className="text-light-green">Approved</p>
                    </div>
                    <p
                      onClick={() => setShowDetailsModal(true)}
                      className="w-[10%] underline text-primary-wine text-right cursor-pointer"
                    >
                      View
                    </p>
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

      <TransactionsDetailsModal
        showModal={showDetailsModal}
        closeModal={() => setShowDetailsModal(false)}
      />
    </>
  );
};

export default AuthenticatedRoute(BulkTransactions);
