export const Loader = ({ className }: { className?: string }): JSX.Element => {
  return (
    <div
      className={`${
        className ? className : "w-6 h-6 border-primary-white"
      } loader__container`}
    />
  );
};
