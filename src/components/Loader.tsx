export const Loader = ({ className }: { className?: string }): JSX.Element => {
  return (
    <div
      className={`${
        className || "w-5 h-5 border-primary-white"
      } loader__container`}
    />
  );
};

export const ListLoader = () => {
  return (
    <div className="w-full flex flex-col items-center py-40 2xl:py-[300px] flex-1">
      <div className="small_spinner" />
    </div>
  );
};
