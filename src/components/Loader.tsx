export const Loader = ({ className }: { className?: string }): JSX.Element => {
  return (
    <div
      className={`${
        className || "w-6 h-6 border-primary-white"
      } loader__container`}
    />
  );
};

export const ListLoader = () => {
  return (
    <div className="w-full flex flex-col items-center py-32 flex-1">
      <div className="spinner" />
    </div>
  );
};
