import { ROLES } from "@/utils";

export const FilterComponent = ({
  showModal,
  closeModal,
  selected,
  setSelected,
  setCurrentPage,
  className,
}: {
  showModal: boolean;
  closeModal: () => void;
  selected: string;
  setSelected: (state: string) => void;
  setCurrentPage?: (state: number) => void;
  className?: string;
}) => {
  const options = selected
    ? [
        {
          name: "Complete",
          option: "COMPLETE",
        },
        {
          name: "Pending",
          option: "PENDING",
        },
        { name: "Reset Filter", option: "" },
      ]
    : [
        {
          name: "Complete",
          option: "COMPLETE",
        },
        {
          name: "Pending",
          option: "PENDING",
        },
      ];
  return (
    <div
      className={`${className} absolute top-10 right-0 w-[170px] text-primary-black z-30 bg-white border divide-y flex flex-col justify-center items-center rounded-[10px] text-center text-sm animation ${
        showModal ? "opacity-100 visible mt-0" : "opacity-0 invisible mt-5"
      }`}
    >
      {ROLES.map((option: string) => (
        <button
          type="button"
          key={option}
          onClick={() => {
            // setCurrentPage(1);
            setSelected(option);
            closeModal();
          }}
          className="hover:bg-slate-100/50 w-full py-3 uppercase"
        >
          {option}
        </button>
      ))}
    </div>
  );
};
