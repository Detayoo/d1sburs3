import Image from "next/image";
import { Loader } from "./Loader";

interface ButtonProps {
  title: JSX.Element | string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
  loading?: boolean;
  [x: string]: any;
}

export const PrimaryButton = ({
  title,
  onClick,
  className,
  type,
  disabled,
  textColor,
  bgColor,
  borderColor,
  image,
  loading,
  ...rest
}: ButtonProps) => {
  const renderTitle = () => {
    if (loading) return <Loader />;
    return (
      <>
        {title} {!!image && <Image src={image} alt="" width={21} height={21} />}
      </>
    );
  };
  return (
    <button
      type={type}
      className={`${textColor ? textColor : "text-white"} ${
        bgColor && bgColor
      } ${disabled ? "bg-primary-wine opacity-50" : "bg-primary-wine"} ${
        borderColor ? borderColor : "border-primary-wine"
      } px-10 py-[12px] text-[14px] font-[300] rounded-[3px] inline-flex justify-center items-center gap-[5px] focus:outline-none ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {renderTitle()}
    </button>
  );
};
