// all utility/helper funtions
import { clsx, type ClassValue } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTimeTo12Hour(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const truncateText = (
  text: string,
  length: number,
  from: "start" | "end" = "start"
) => {
  if (text.length <= length) return text;

  if (from === "start") return `${text.slice(0, length)}...`;
  else if (from === "end") return `...${text.slice(-length)}`;
};

const toTitleCase = (str: string): string => {
  return str
    ?.toLowerCase()
    ?.split(/\s|-/) // Split on spaces or hyphens
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    ?.join(" ");
};

const handleError = (error: any) =>
  toast.error(
    error?.response?.data?.message || error?.message || "Something went wrong."
  );

const getYear = (dateString: string) => new Date(dateString).getUTCFullYear();

export const utils = {
  cn,
  formatDate,
  formatTimeTo12Hour,
  truncateText,
  toTitleCase,
  handleError,
  getYear,
};
