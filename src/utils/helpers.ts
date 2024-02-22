import { MutableRefObject } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const excerpt = (text: string, length?: number) => {
  const strLen = length || 80;
  if (text?.length > strLen) {
    return text.substring(0, length) + "...";
  }

  return text;
};

export const fileSizeInMB = (bytes: number) => {
  return (bytes / 1024 / 1024).toFixed(2);
};

export const appErrorHandler = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error?.message.toLowerCase().includes("network error")) {
      return "A network error occurred. Please try again";
    }
    if (error.response) {
      return error.response?.data["message"] || error.response.statusText;
    } else if (error.request) {
      return error.request;
    } else {
      return "Something went wrong. Please check your internet connection and try again.";
    }
  }
  if (!error) {
    return "An error occured. Please try again!";
  }
  if (typeof error === "string") {
    return error;
  }
};

export const extractAppServerError = (
  error: unknown,
  defaultErrorMessage: string
) => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message;

    if (message) {
      return message;
    } else {
      return defaultErrorMessage;
    }
  } else if (error instanceof Error) {
    return error?.message || defaultErrorMessage;
  } else {
    return defaultErrorMessage;
  }
};

export const handleScrollToTop = (div: MutableRefObject<any>) => {
  div.current.scrollTop = 0;
};

export const perPage = 5;

export const ROLES = ["ADMIN", "APPROVER", "INITIATOR"];
