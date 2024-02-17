import Image from "next/image";

interface ButtonProps {
  title: any;
  onClick?: () => any;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
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
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${textColor ? textColor : "text-white"} ${
        bgColor && bgColor
      } ${disabled ? "bg-disabled-btn" : "bg-primary-wine"} ${
        borderColor ? borderColor : "border-primary-wine"
      } px-10 py-[12px] text-[14px] font-[300] rounded-[3px] inline-flex justify-center items-center gap-[5px] focus:outline-none ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {title} {!!image && <Image src={image} alt="" width={21} height={21} />}
    </button>
  );
};
