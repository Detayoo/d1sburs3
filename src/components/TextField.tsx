import React from "react";
import Image from "next/image";
import { Field, ErrorMessage } from "formik";

export const TextField = ({
  type,
  name,
  placeholder,
  divClass,
  textClass,
  labelClass,
  borderClass,
  htmlFor,
  label,
  values,
  maxlength,
  disabled,
  icon,
  error,
  onChange,
  onKeyDown,
  ...rest
}: {
  type: string;
  name: string;
  htmlFor: string;
  label: any;
  values: any;
  error: any;
  placeholder?: string;
  divClass?: string;
  textClass?: string;
  labelClass?: string;
  borderClass?: string;
  maxlength?: string;
  disabled?: boolean;
  icon?: string;
  onChange?: (e: any) => void;
  onKeyDown?: (e: any) => void;
}): JSX.Element => (
  <div className={`${divClass}`}>
    <label
      htmlFor={htmlFor}
      className={`w-full text-[15px] inline-flex justify-between items-center mb-1 ${labelClass}`}
    >
      {label}
      {!!icon && (
        <Image
          src={icon}
          alt=""
          width={12}
          height={12}
          className="rounded-full cursor-pointer"
        />
      )}
    </label>
    {onChange ? (
      <Field
        type={type}
        name={name}
        id={htmlFor}
        placeholder={placeholder}
        maxLength={maxlength}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
        {...rest}
        className={`w-full h-12 bg-white rounded-[5px] px-5 py-1 text-[14px] ${
          disabled ? "" : "bg-white"
        } placeholder:text-border-gray placeholder:text-sm ${
          error
            ? "border-red-500"
            : values
            ? "border-primary-wine"
            : `${borderClass ? borderClass : "border-border-gray"}`
        } border-[1px] border-border-gray focus:outline-none ${textClass}`}
      />
    ) : (
      <Field
        type={type}
        name={name}
        id={htmlFor}
        placeholder={placeholder}
        maxLength={maxlength}
        disabled={disabled}
        onKeyDown={onKeyDown}
        {...rest}
        className={`w-full h-12 bg-white rounded-[5px] px-5 py-1 text-[14px] ${
          disabled ? "bg-disabled-bg" : "bg-white"
        } placeholder:text-border-gray placeholder:text-sm ${
          error
            ? "border-red-500"
            : values
            ? "border-primary-wine"
            : `${borderClass ? borderClass : "border-border-gray"}`
        } border-[1px] border-border-gray focus:outline-none ${textClass}`}
      />
    )}

    <ErrorMessage name={name} className="error" component="p" />
  </div>
);

export const PasswordField = ({
  type,
  name,
  placeholder,
  divClass,
  textClass,
  labelClass,
  borderClass,
  htmlFor,
  label,
  values,
  maxlength,
  onClick,
  disabled,
  icon,
  error,
  onHover,
  onChange,
  toggleText,
  ...rest
}: {
  type: string;
  name: string;
  htmlFor: string;
  label: any;
  values: any;
  error: any;
  maxlength?: string;
  placeholder?: string;
  divClass?: string;
  textClass?: string;
  labelClass?: string;
  borderClass?: string;
  imageClass?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: string;
  onHover?: () => void;
  onChange?: (e: any) => void;
  toggleText: string;
}): JSX.Element => (
  <div className={`w-full ${divClass}`}>
    <div className="w-full mb-1 flex justify-between">
      <label
        htmlFor={htmlFor}
        className={`flex-1 text-[15px] inline-flex justify-between items-baseline ${labelClass}`}
      >
        {label}
        {!!icon && (
          <Image
            src={icon}
            alt=""
            width={12}
            height={12}
            className="rounded-full cursor-pointer"
            onMouseOver={onHover}
          />
        )}
      </label>
    </div>
    <div
      className={`w-full h-12 px-3 ${
        disabled ? "bg-disabled-bg" : "bg-white"
      } rounded-[5px] ${
        error
          ? "border-red-500"
          : values
          ? "border-primary-wine"
          : `${borderClass ? borderClass : "border-border-gray"}`
      } border-[1px] border-border-gray flex items-center gap-1`}
    >
      {onChange ? (
        <Field
          type={type}
          name={name}
          id={htmlFor}
          placeholder={placeholder}
          maxLength={maxlength}
          disabled={disabled}
          onChange={onChange}
          {...rest}
          className={`w-full flex-1 h-full px-1 py-1 text-[15px] ${
            disabled ? "bg-disabled-bg" : "bg-white"
          }  placeholder:text-sm focus:outline-none ${textClass}`}
        />
      ) : (
        <Field
          type={type}
          name={name}
          id={htmlFor}
          placeholder={placeholder}
          maxLength={maxlength}
          disabled={disabled}
          {...rest}
          className={`w-full flex-1 h-full px-1 py-1 text-[15px] ${
            disabled ? "" : "bg-white"
          } placeholder:text-sm focus:outline-none ${textClass}`}
        />
      )}

      <div
        className="text-primary-wine text-sm cursor-pointer"
        onClick={onClick}
      >
        {toggleText}
      </div>
    </div>
    <ErrorMessage name={name} className="error" component="p" />
  </div>
);

export const PhoneNumberField = ({
  type,
  name,
  placeholder,
  divClass,
  textClass,
  labelClass,
  borderClass,
  htmlFor,
  label,
  values,
  maxlength,
  disabled,
  icon,
  error,
  onChange,
  onKeyDown,
  countryNumber,
  ...rest
}: {
  type: string;
  name: string;
  htmlFor: string;
  label: any;
  values: any;
  error: any;
  placeholder?: string;
  divClass?: string;
  textClass?: string;
  labelClass?: string;
  borderClass?: string;
  maxlength?: string;
  disabled?: boolean;
  icon?: string;
  onChange?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  countryNumber?: string;
}): JSX.Element => (
  <div className={`${divClass}`}>
    <label
      htmlFor={htmlFor}
      className={`w-full text-[15px] inline-flex justify-between items-center mb-1 ${labelClass}`}
    >
      {label}
      {!!icon && (
        <Image
          src={icon}
          alt=""
          width={12}
          height={12}
          className="rounded-full cursor-pointer"
        />
      )}
    </label>
    {onChange ? (
      <div
        className={`flex px-5 gap-x-6 items-center rounded-[5px] justify-center ${
          error
            ? "border-red-500"
            : values
            ? "border-primary-wine"
            : `${borderClass ? borderClass : "border-border-gray"}`
        } border-[1px] border-border-gray`}
      >
        <div className="flex items-center gap-x-2">
          <Image
            src="/icons/nigerian-flag.svg"
            alt="flag"
            width={30}
            height={19}
          />
          <p className="text-sm">{countryNumber}</p>
        </div>
        <div className="w-[1px] ml-3 h-12 bg-border-gray"></div>
        <Field
          type={type}
          name={name}
          id={htmlFor}
          placeholder={placeholder}
          maxLength={maxlength}
          disabled={disabled}
          onChange={onChange}
          onKeyDown={onKeyDown}
          {...rest}
          className={`w-full h-12 bg-white  py-1 text-[14px] ${
            disabled ? "bg-disabled-bg" : "bg-white"
          } placeholder:text-border-gray placeholder:text-sm   focus:outline-none ${textClass}`}
        />
      </div>
    ) : (
      <div
        className={`flex px-5 gap-x-6 items-center rounded-[5px] justify-center ${
          error
            ? "border-red-500"
            : values
            ? "border-primary-wine"
            : `${borderClass ? borderClass : "border-border-gray"}`
        } border-[1px] border-border-gray`}
      >
        <div className="flex items-center gap-x-2">
          <Image
            src="/icons/nigerian-flag.svg"
            alt="flag"
            width={30}
            height={19}
          />
          <p className="text-sm">{countryNumber}</p>
        </div>
        <div className="w-[1px] ml-3 h-12 bg-border-gray"></div>
        <Field
          type={type}
          name={name}
          id={htmlFor}
          placeholder={placeholder}
          maxLength={maxlength}
          disabled={disabled}
          onKeyDown={onKeyDown}
          {...rest}
          className={`w-full h-12 bg-white  py-1 text-[14px] ${
            disabled ? "bg-disabled-bg" : "bg-white"
          } placeholder:text-border-gray placeholder:text-sm   focus:outline-none ${textClass}`}
        />
      </div>
    )}

    <ErrorMessage name={name} className="error" component="p" />
  </div>
);

export const SelectField = ({
  children,
  name,
  htmlFor,
  label,
  type = "text",
  divClass,
  labelClass,
  textClass,
  contentClass,
  disabled,
  value,
  error,
  onChange,
  bgColor,
  ...rest
}: {
  children: any;
  name: string;
  htmlFor: string;
  label: string;
  type?: string;
  divClass?: string;
  labelClass?: string;
  textClass?: string;
  contentClass?: string;
  disabled?: boolean;
  value: string;
  error?: any;
  onChange?: (e?: any) => void;
  bgColor?: string;
  [x: string]: any;
}) => {
  if (onChange) {
    return (
      <div className={`w-full ${divClass}`}>
        <label
          htmlFor={htmlFor}
          className={`inline-block text-[14px] text-subtext-black mb-1 ${labelClass}`}
        >
          {label}
        </label>
        <div
          className={`w-full h-12 rounded-[5px] text-[14px] flex items-center gap-x-3  ${
            error
              ? `border-red-500 ${bgColor ? bgColor : "bg-white"}`
              : `border-input-gray-border ${bgColor ? bgColor : "bg-white"}`
          } border-[1px] overflow-hidden ${contentClass}`}
        >
          <Field
            type={type}
            as="select"
            name={name}
            id={htmlFor}
            className={`h-full bg-transparent flex-1 text-[14px] text-text-black pl-3 border-transparent border-r-[6px] py-1 outline-none`}
            disabled={!!disabled}
            onChange={onChange}
            value={value}
            {...rest}
          >
            {children}
          </Field>
        </div>
        <ErrorMessage name={name} className="error" component="p" />
      </div>
    );
  }

  return (
    <div className={`w-full ${divClass}`}>
      <label
        htmlFor={htmlFor}
        className={`inline-block text-[14px] text-subtext-black mb-1 ${labelClass}`}
      >
        {label}
      </label>
      <div
        className={`w-full h-12 rounded-[5px] text-[14px] pr-3 flex items-center gap-x-3 ${
          error
            ? `border-red-500 ${bgColor ? bgColor : "bg-white"}`
            : `border-input-gray-border ${bgColor ? bgColor : "bg-white"}`
        } border-[1px] overflow-hidden ${contentClass}`}
      >
        <Field
          type={type}
          as="select"
          name={name}
          id={htmlFor}
          className={`h-full bg-transparent flex-1 text-[14px] text-text-black pl-3 border-transparent border-r-[6px] py-1 outline-none`}
          disabled={!!disabled}
          value={value}
          {...rest}
        >
          {children}
        </Field>
      </div>
      <ErrorMessage name={name} className="error" component="p" />
    </div>
  );
};
