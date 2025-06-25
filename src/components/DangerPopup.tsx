import React from "react";
import Danger from "./icons/Danger";
import { LuLoaderCircle } from "react-icons/lu";

type DangerPopupProps = {
  title: string;
  desc: string;
  cancelTitle?: string;
  doneTitle?: string;
  show: boolean;
  onClose: () => void;
  onContinue?: () => void;
  loading?: boolean;
};

const DangerPopup: React.FC<DangerPopupProps> = ({
  title,
  desc,
  cancelTitle = "No, Keep It",
  doneTitle = "Yes, Disable Now",
  show,
  onClose,
  onContinue,
  loading,
}) => {
  if (!show) return null;

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full h-screen bg-[#00000041] backdrop-blur-xs flex justify-center items-center ${
        show ? "animate-fadeIn" : "animate-fadeOut"
      }`}
    >
      <div
        className={`relative bg-white p-10 rounded-[20px] flex flex-col justify-center items-center gap-3 ${
          show ? "animate-popupIn" : "animate-popupOut"
        }`}
      >
        <Danger />

        <p className="font-general-semibold text-xl">{title}</p>
        <p className="text-desc max-w-44 text-center">{desc}</p>

        <div className="flex items-center gap-3">
          <button
            className="cursor-pointer w-[140px] h-[44px] bg-[#ECECEC] text-sm font-general-medium rounded-lg flex justify-center items-center text-black"
            onClick={onClose}
          >
            {cancelTitle}
          </button>
          <button
            disabled={loading}
            className={`cursor-pointer w-[140px] h-[44px] ${
              loading && "opacity-50"
            } bg-[#EE3131] text-sm font-general-medium rounded-lg flex justify-center items-center text-white`}
            onClick={onContinue}
          >
            {loading ? (
              <LuLoaderCircle className="animate-spin" size={24} />
            ) : (
              doneTitle
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DangerPopup;
