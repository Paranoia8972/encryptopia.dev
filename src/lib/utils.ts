import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, subDays } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDate = (sub: number = 0) => {
  const dateXDaysAgo = subDays(new Date(), sub);

  return format(dateXDaysAgo, "dd/MM/yyyy");
};
