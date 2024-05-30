export const Loader = ({ className }: { className?: string }): JSX.Element => {
  return <div className={` w-5 h-5 loader__container ${className} `} />;
};

export const ListLoader = () => {
  return (
    <div className="w-full flex flex-col items-center py-40 2xl:py-[300px] flex-1">
      <div className="small_spinner" />
    </div>
  );
};
