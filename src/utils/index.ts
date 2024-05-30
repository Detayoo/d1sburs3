export { maskEmail } from "./maskEmail";
export * from "./helpers";
export * from "./routes";
export * from "./validators";
export * from "./AuthenticatedRoute";
export * from './errors';

export const formatMoney = (text: string | number) => {
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

export const STATUS_OBJ = {
  isUsed: "bg-[#F9F4FF] text-primary-wine",
  isUnused: "bg-primary-wine text-white",
  isRevoked: "bg-primary-wine text-white",
};
