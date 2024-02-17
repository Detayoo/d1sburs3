export const FilterComponent = ({
  showModal,
  setShowModal,
  selected,
  setSelected,
  setCurrentPage,
}: {
  showModal: boolean;
  setShowModal: (state: boolean) => void;
  selected: string;
  setSelected: (state: string) => void;
  setCurrentPage: (state: number) => void;
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
      className={`absolute top-10 right-0 w-[170px] text-primary-black z-30 bg-white border divide-y flex flex-col justify-center items-center rounded-[10px] text-center text-sm animation ${
        showModal ? "opacity-100 visible mt-0" : "opacity-0 invisible mt-5"
      }`}
    >
      {options.map((option) => (
        <p
          onKeyDown={() => {}}
          key={option.option}
          onClick={() => {
            setShowModal(false);
            setCurrentPage(1);
            setSelected(option?.option);
          }}
          className="hover:bg-slate-100/50 w-full py-3 uppercase"
        >
          {option?.name}
        </p>
      ))}
    </div>
  );
};
