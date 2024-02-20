export const ModalContainer = ({
  children,
  showModal,
  closeModal,
}: {
  children: any;
  showModal: boolean;
  closeModal: () => void;
}): JSX.Element => {
  return (
    <div
      className={`fixed top-0 left-0 z-[30] w-full h-screen flex justify-center items-center animation ${
        showModal ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {children}
      <div
        className="absolute top-0 left-0 w-full h-full bg-overlay z-[50]"
        onClick={closeModal}
      />
    </div>
  );
};
