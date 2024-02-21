export { maskEmail } from "./maskEmail";
export * from "./helpers";
export * from "./routes";
export * from "./validators";

export const formatMoney = (text: string) => {
  return Intl.NumberFormat("NGN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(Number(text));
};

export const formatNumber = (text: string | number) => {
  return Intl.NumberFormat("NGN", { maximumFractionDigits: 2 }).format(
    Number(text)
  );
};
