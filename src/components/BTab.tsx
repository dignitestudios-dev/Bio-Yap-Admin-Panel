import React from "react";
import { LuLoaderCircle } from "react-icons/lu";

type BTabProps = {
  title: string;
  active: boolean;
  type?: "submit" | "button";
  loading?: boolean;
  w?: "fit" | "full" | "";
  onBtnClick?: any;
  disabled?: boolean;
  xl?: boolean;
};

const BTab: React.FC<BTabProps> = ({
  title,
  active = false,
  type = "button",
  loading = false,
  w,
  onBtnClick,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`
        ${
          w === "fit"
            ? "w-fit px-4 min-w-28"
            : w === "full"
            ? "w-full"
            : "px-4 min-w-40"
        }
         flex items-center justify-center gap-2 select-none px-[15px] h-[49px] max-w-full rounded-lg transition-all ${
           active ? "bg-primary" : "bg-white"
         } text-black font-bold ${
        loading || disabled
          ? "cursor-not-allowed opacity-75"
          : "cursor-pointer active:scale-[.95]"
      }`}
      onClick={onBtnClick}
      disabled={loading || disabled}
    >
      {loading ? <LuLoaderCircle className="animate-spin" /> : title}
    </button>
  );
};

export default BTab;
