import React, { useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";

type Props = {
  show: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  loading?: boolean;
};

const ConfirmRejectPopup: React.FC<Props> = ({
  show,
  onClose,
  onConfirm,
  loading,
}) => {
  const [reason, setReason] = useState<string>("");

  if (!show) return null;

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full h-screen bg-[#00000041] backdrop-blur-xs flex justify-center items-center ${
        show ? "animate-fadeIn" : "animate-fadeOut"
      }`}
    >
      <div
        className={`relative bg-white p-6 rounded-[12px] w-[520px] ${
          show ? "animate-popupIn" : "animate-popupOut"
        }`}
      >
        <p className="font-general-semibold text-xl mb-2">Reject Withdrawal</p>
        {/* <p className="text-desc mb-4">
          Please provide a reason for rejecting this withdrawal (optional).
        </p>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full h-[120px] p-3 border rounded mb-4 outline-none"
          placeholder="Enter rejection reason"
        /> */}

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded text-white ${
              loading ? "bg-gray-400" : "bg-red-500"
            }`}
            onClick={() => onConfirm(reason || undefined)}
            disabled={loading}
          >
            {loading ? <LuLoaderCircle className="animate-spin" /> : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRejectPopup;
