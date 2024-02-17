"use client";

import { SyntheticEvent } from "react";
import DatePicker from "react-datepicker";

export const DateComponent = ({
  selected,
  name,
  error,
  placeholder,
  onChange,
  format,
  minDate,
  maxDate,
  showTime,
  ...rest
}: {
  selected: any;
  name: string;
  error?: any;
  placeholder: string;
  onChange: (date: Date, event: SyntheticEvent<any, Event>) => void;
  format: string;
  minDate?: any;
  maxDate?: any;
  showTime?: boolean;
  [x: string]: any;
}) => {
  if (showTime) {
    return (
      <div
        className={`w-full h-12 flex items-center gap-3 px-3 rounded-[5px] calendar__wrapper ${
          error
            ? "border-red-500"
            : selected
            ? "border-input-gray-border bg-primary-white"
            : "border-input-gray-border bg-white"
        } border-[1px]`}
      >
        <DatePicker
          selected={selected}
          name={name}
          placeholderText={placeholder}
          onChange={onChange}
          wrapperClassName="calendar__div"
          className="w-full h-full bg-transparent outline-none"
          id={name}
          dateFormat={format}
          minDate={minDate}
          maxDate={maxDate}
          showYearDropdown
          dateFormatCalendar="MMMM"
          yearDropdownItemNumber={100}
          scrollableYearDropdown
          timeInputLabel="Time: "
          showTimeInput
          {...rest}
        />
        <label
          htmlFor={name}
          className="relative cursor-pointer w-[20px] h-[20px]"
        >
          {/* <Image src="/icons/calendar-icon.svg" alt="Calendar Icon" fill /> */}
        </label>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-12 flex items-center gap-3 px-3 rounded-[5px] calendar__wrapper ${
        error
          ? "border-red-500"
          : selected
          ? "border-input-gray-border bg-primary-white"
          : "border-input-gray-border bg-white"
      } border-[1px]`}
    >
      <DatePicker
        selected={selected}
        name={name}
        placeholderText={placeholder}
        onChange={onChange}
        wrapperClassName="calendar__div"
        className="w-full h-full bg-transparent outline-none"
        id={name}
        dateFormat={format}
        minDate={minDate}
        maxDate={maxDate}
        showYearDropdown
        dateFormatCalendar="MMMM"
        yearDropdownItemNumber={100}
        scrollableYearDropdown
        {...rest}
      />
      <label
        htmlFor={name}
        className="relative cursor-pointer w-[20px] h-[20px]"
      >
        {/* <Image src="/icons/calendar-icon.svg" alt="Calendar Icon" fill /> */}
      </label>
    </div>
  );
};
