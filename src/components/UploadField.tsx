import { excerpt } from "@/utils";
import { ErrorMessage } from "formik";
import Image from "next/image";

export const UploadField = ({
  name,
  htmlFor,
  divClass,
  disabled,
  value,
  error,
  onChange,
  placeholder,
  bgColor,
  changeFile,
  titleText,
  contentText,
  fileText,
  hideValue,
  hideContent,
  fileSize,
  ...rest
}: {
  name: string;
  htmlFor: string;
  divClass?: string;
  disabled?: boolean;
  value: any;
  error?: any;
  onChange: (e?: any) => void;
  placeholder?: string;
  bgColor?: string;
  changeFile: () => void;
  titleText?: any;
  contentText?: any;
  fileText: any;
  hideValue?: boolean;
  hideContent?: boolean;
  fileSize: string;
  [x: string]: any;
}) => {
  return (
    <div className={`w-full ${divClass}`}>
      {!value || hideValue ? (
        <label
          htmlFor={htmlFor}
          className="w-full px-8 py-6 rounded-[5px] bg-payment-details-yellow-bg border-[#D8BFC7] border-dashed cursor-pointer border-[1px] flex flex-col items-center"
        >
          <Image src="/icons/upload-csv.svg" alt="" width={28} height={28} />
          <div className="text-[16px] text-primary-black mt-4 text-center">
            {titleText || "Upload CSV Document"}
          </div>
          {!hideContent && (
            <div className="text-[13px] text-primary-black text-center mt-2">
              {contentText}
            </div>
          )}
          <input
            value={value}
            type="file"
            name={name}
            className="hidden"
            id={htmlFor}
            onChange={onChange}
            disabled={!!disabled}
            {...rest}
          />
        </label>
      ) : (
        <div className="w-full min-h-[3rem] relative px-4 py-1 border-otp-gray border-[1px] flex items-center justify-between rounded-[5px]">
          <div className="flex items-center gap-x-4">
            <Image
              src="/icons/csv-icon.svg"
              alt="csv icon"
              width={24}
              height={24}
            />
            <p className="text-primary-wine text-[15px]">
              {excerpt(fileText, 20)}.csv
            </p>
            <p className="text-[#B8B7B8] text-sm">{fileSize}MB</p>
          </div>
          <Image
            src="/icons/delete-icon.svg"
            alt="delete icon"
            width={24}
            height={24}
            className="cursor-pointer "
            onClick={changeFile}
            onKeyDown={() => {}}
          />
        </div>
      )}
      <ErrorMessage name={name} component="p" className="error" />
    </div>
  );
};
