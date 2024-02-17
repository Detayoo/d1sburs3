export { maskEmail } from "./maskEmail";

export const formatMoney = (text: string, isMoney?: boolean): string => {
  if (isMoney) {
    return Intl.NumberFormat("NGN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(Number(text));
  }

  return Intl.NumberFormat("NGN", { maximumFractionDigits: 4 }).format(
    Number(text)
  );
};
