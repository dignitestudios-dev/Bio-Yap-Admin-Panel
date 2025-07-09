import { SubscriptionPlan } from "@/lib/types";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

type SubscriptionPlanDetailsPopupProps = {
  show: boolean;
  onClose: () => void;
  plan: SubscriptionPlan | null;
};

const SubscriptionPlanDetailsPopup: React.FC<
  SubscriptionPlanDetailsPopupProps
> = ({ show, onClose, plan }) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);

  if (!show || !plan) return null;

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-50 w-full h-screen bg-[#00000041] backdrop-blur-xs flex justify-center items-center ${
          show ? "animate-fadeIn" : "animate-fadeOut"
        }`}
      >
        <div
          className={`relative bg-white max-w-[450px] w-full px-6 py-4 rounded-[20px] flex flex-col justify-center items-start gap-3 ${
            show ? "animate-popupIn" : "animate-popupOut"
          }`}
        >
          <div className="w-full pb-4 flex items-center justify-between separator">
            <p className="font-general-semibold text-2xl">
              Subscription Plan Details
            </p>

            <IoCloseOutline
              className="cursor-pointer"
              size={28}
              onClick={onClose}
            />
          </div>

          <div className="w-full pb-4 separator">
            <p className="font-general-medium">{plan.title}</p>
          </div>

          <div className="w-full grid grid-cols-2 pb-4 separator">
            <div>
              <p className="text-desc">Subscription Type</p>
              <p className="font-general-medium">{plan.productId}</p>
            </div>
            <div className="ps-4 border-s border-[#eaeaea]">
              <p className="text-desc">Subscription Price</p>
              <p>
                <span className="font-general-semibold">${plan.price}</span>/yr
              </p>
            </div>
          </div>

          <div className="pb-4">
            <p className="font-general-medium">Benefits</p>
            <ul className="flex flex-col gap-1 mt-2 text-desc text-sm">
              {plan.description.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPlanDetailsPopup;
