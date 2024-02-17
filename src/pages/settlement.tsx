import { useState } from "react";
import Image from "next/image";

import {
  DashboardLayout,
  Pagination,
  PrimaryButton,
  Title,
  FilterComponent,
  DateComponent,
  BalanceCard,
} from "@/components";
import { MakeSettlementModal, SettlementDetailsModal } from "@/modals";
import { formatMoney } from "@/helpers";

const transactions: any = ["", "", ""];

const Settlement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportTrx, setExportTrx] = useState(false);
  const [filterItem, setFilterItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState({});
  const [exportObj, setExportObj] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showSettlementModal, setShowSettlementModal] = useState(false);
  const [initializeSettlement, setInitializeSettlement] = useState(false);
  const [filterObj, setFilterObj] = useState({});
  const [stage, setStage] = useState("wallet-selection");

  const handleExport = () => {};

  const handleCloseSettlementModal = () => {
    setShowSettlementModal(false);
    setTimeout(() => {
      setStage("wallet-selection");
    }, 200);
  };

  return (
    <>
      <Title name="Settlement" />
      <DashboardLayout>
        <div className="bg-[#FBFCFF] py-6">
          {initializeSettlement && (
            <div
              onClick={() => setInitializeSettlement(false)}
              className="fixed top-0 right-0 z-10 w-full h-screen bg-black/50"
            />
          )}
          <div
            className={`absolute top-[13.8rem] right-16 z-[100] rounded-[5px] bg-white text-sm w-[200px] h-[100px] p-[20px] flex flex-col justify-between ${
              initializeSettlement
                ? "opacity-100 visible mt-0"
                : "opacity-0 invisible mt-[5rem]"
            } animation overflow-y-auto`}
          >
            <p
              className="cursor-pointer"
              onClick={() => {
                setInitializeSettlement(false);
                setShowSettlementModal(true);
              }}
            >
              Partial Settlement
            </p>
            <p
              className="cursor-pointer"
              onClick={() => {
                setInitializeSettlement(false);
                setShowSettlementModal(true);
              }}
            >
              Full Settlement
            </p>
          </div>
          <div className="px-[30px] py-[30px] relative bg-white drop-shadow shadow-[#ABABAB26] rounded-[10px]">
            <div className="flex justify-between items-center relative">
              <p className="text-[15px]">Your Available Balances</p>
              <div
                onClick={() => setInitializeSettlement(true)}
                className="flex h-10 items-center px-[25px] gap-x-[10px] bg-primary-wine rounded-[100px] cursor-pointer"
              >
                <p className="text-[15px] text-white">Settlement</p>
                <Image
                  src="/icons/white-down-chevron.svg"
                  alt="chevron icon"
                  width={16}
                  height={16}
                />
              </div>
            </div>

            <div className="flex items-center mt-6 gap-x-10">
              <BalanceCard
                currency="Nigerian Naira"
                moneyValue={`NGN ${formatMoney("1234567")}`}
                src="/icons/naira.svg"
              />
              <BalanceCard
                currency="United States Dollars"
                moneyValue={`USD ${formatMoney("4567")}`}
                src="/icons/dollar.svg"
              />
              <BalanceCard
                currency="Total Transactions"
                moneyValue="234567"
                src="/icons/transactions-icon.svg"
              />
            </div>
          </div>
          {/* <div
            className={`fixed flex justify-center items-center animation ${
              initializeSettlement
                ? "opacity-100 visible"
                : "opacity-0 invisible"
            }`}
          > */}

          {/* </div> */}

          <div className="flex justify-between items-center mt-[30px]">
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
              <div
                onClick={() => {
                  // setShowFilter(!showFilter);
                  // setShowExportModal(false);
                }}
                className="flex gap-x-2 items-center rounded-[3px] border border-primary-wine  py-2 px-4 cursor-pointer relative"
              >
                <Image
                  src="/icons/filter-icon.svg"
                  alt="filter icon"
                  width={16}
                  height={16}
                />

                <p className="text-primary-wine text-sm">Filter by</p>
                <Image
                  src="/icons/down-chevron.svg"
                  alt="chevron icon"
                  width={16}
                  height={16}
                />
                <FilterComponent
                  showModal={showFilter}
                  setShowModal={setShowFilter}
                  selected={filterItem}
                  setSelected={setFilterItem}
                  setCurrentPage={setCurrentPage}
                />
              </div>
              <div className="flex gap-x-2 items-center rounded-[3px] bg-primary-wine py-2 px-4 cursor-pointer relative">
                <div
                  onClick={() => {
                    // if (!exportTrx) setShowExportModal(true);
                    setShowFilter(false);
                  }}
                  className="flex gap-x-2 items-center rounded-[3px]  cursor-pointer relative"
                >
                  <Image
                    src="/icons/export-icon.svg"
                    alt="export icon"
                    width={16}
                    height={16}
                  />
                  <p className="text-white text-sm">
                    {exportTrx ? "Exporting.." : "Export"}
                  </p>
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

          <div className={`max-w-full bg-white text-sm mt-6 flex flex-col`}>
            <div className="flex items-center text-primary-black bg-faint-green font-medium text-[12px]">
              <p className="w-[15%] flex-shrink-0 bg-faint-green pl-4 pr-2 py-4">
                DATE AND TIME
              </p>
              <p className="w-[15%] flex-shrink-0 bg-faint-green px-2 py-4">
                CURRENCY NAME
              </p>
              <p className="w-[20%] flex-shrink-0 bg-faint-green px-2 py-4">
                SENDER DETAILS
              </p>
              <p className="w-[15%] flex-shrink-0 bg-faint-green px-2 py-4">
                AMOUNT
              </p>
              <p className="w-[15%] flex-shrink-0 bg-faint-green px-2 py-4">
                TYPE
              </p>
              <p className="w-[15%] flex-shrink-0 bg-faint-green px-2 py-4">
                TRANSACTION REF.
              </p>
              <p className="w-[5%] flex-shrink-0 bg-faint-green px-2 py-4"></p>
            </div>
            {transactions?.map((transaction: any, index: number) => {
              return (
                <div
                  key={index}
                  className="flex items-center text-primary-black bg-white font-medium text-[12px] "
                >
                  <p className="w-[15%] flex-shrink-0 bg-white pl-4 pr-2 py-4">
                    12-08-2023 12:05pm
                  </p>
                  <div className="flex items-center w-[15%] flex-shrink-0 bg-white px-2 py-4 gap-[5px] text-right">
                    <Image
                      width={24}
                      height={24}
                      alt="currency"
                      src="/icons/naira.svg"
                    />

                    <p>NGN</p>
                  </div>
                  <div className="w-[20%] flex-shrink-0 bg-white px-2 py-4 font-Onest-Medium">
                    <p className="">AYOBAMI WALTERS</p>
                    <div>
                      <p>First bank | 1234567890</p>
                    </div>
                  </div>
                  <p className="w-[15%] flex-shrink-0 bg-white px-2 py-4 font-Onest-Medium">
                    &#8358;{formatMoney("120000")}
                  </p>
                  <p className="w-[15%] flex-shrink-0 bg-white px-2 py-4">
                    Bank Transfer
                  </p>
                  <div className="flex justify-between mb-7 pb-4 border-b border-b-faint-gray">
                    <p>Transaction Ref.</p>
                    <div className="flex gap-x-2">
                      <p className="uppercase font-Onest-Medium">
                        JWT123561276{" "}
                      </p>
                      <Image
                        width={11}
                        height={12}
                        alt="copy"
                        src="/icons/copy.svg"
                      />
                    </div>
                  </div>
                  <div
                    onClick={() => setShowDetailsModal(true)}
                    className="w-[5%] flex-shrink-0 bg-white px-2 py-4 cursor-pointer"
                  >
                    <Image
                      src="/icons/action-icon.svg"
                      width={15}
                      height={4}
                      alt="action icon"
                    />
                  </div>
                </div>
              );
            })}
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
      <SettlementDetailsModal
        showModal={showDetailsModal}
        closeModal={() => setShowDetailsModal(false)}
      />
      <MakeSettlementModal
        showModal={showSettlementModal}
        closeModal={handleCloseSettlementModal}
        stage={stage}
        setStage={setStage}
      />
    </>
  );
};

export default Settlement;
