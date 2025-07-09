"use client";
import Search from "@/components/icons/Search";
import SubscriptionPlanDetailsPopup from "@/components/SubscriptionPlanDetailsPopup";
import useDebounceSearch from "@/hooks/useDebounceSearch";
import { SubscriptionPlan } from "@/lib/types";
import { utils } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const SubscriptionPlans = () => {
  const plans: SubscriptionPlan[] = [
    {
      status: "pending",
      autoRenew: true,
      features: [],
      _id: "6850a4ab74c367b01f2ecd67",
      title: "BioYap Premium Plan",
      price: 24.99,
      description: [
        "Access to advanced networking tools specific to biopharma professionals",
        "Direct messaging and video intros",
        "AI-powered career assistant for job matching, post suggestions, and networking tips",
        "Post insights and content priority",
        "Early access to invite-only rooms and premium features",
        "Exclusive badge icons for Founding Members and Premium users",
      ],
      productId: "Yearly",
      createdAt: "2025-06-16T23:11:39.970Z",
      updatedAt: "2025-06-16T23:11:39.970Z",
      __v: 0,
      startDate: "2025-06-17T22:10:25.720Z",
    },
  ];

  const [subscriptionPlanDetails, setSubscriptionPlanDetails] =
    useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    null
  );
  const [searchValue, setSearhValue] = useState<string>("");
  const searchValueDebounce: string = useDebounceSearch(searchValue);

  // Filter plans based on search
  const filteredPlans = plans.filter((plan) =>
    plan.title.toLowerCase().includes(searchValueDebounce.toLowerCase())
  );

  return (
    <>
      <div className="px-4 flex items-center justify-between">
        <h2 className="section-heading">Subscription Plans</h2>

        <div className="bg-white rounded-lg w-[250px] h-[50px] flex items-center gap-2 px-4">
          <Search />

          <input
            type="text"
            placeholder="Search"
            className="outline-none flex-1 h-full"
            onChange={(e) => setSearhValue(e.target.value)}
          />
        </div>
      </div>
      {/* Users Table */}
      <div className="bg-white rounded-xl px-4 pb-4 overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr>
              <th colSpan={7} className="h-[16px] bg-white" />
            </tr>
            <tr className="bg-[#F2FDE0]">
              <th className="px-4 py-5 text-left text-nowrap rounded-s-[8px]">
                #
              </th>
              <th className="px-4 py-5 text-left text-nowrap">Name</th>
              <th className="px-4 py-5 text-left text-nowrap">Description</th>
              <th className="px-4 py-5 text-left text-nowrap">
                Subscription Type
              </th>
              <th className="px-4 py-5 text-left text-nowrap">
                Subscription Price
              </th>
              <th className="px-4 py-5 text-left text-nowrap  rounded-e-[8px]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="mt-10">
            {filteredPlans?.map((plan, index) => (
              <tr key={plan._id} className="border-b-1 border-[#D4D4D4]">
                <td className="px-4 py-6">{index + 1}</td>
                <td className="px-4 py-6">{plan?.title}</td>
                <td className="px-4 py-6">
                  {utils.truncateText(plan?.description?.join(", "), 50)}
                </td>
                <td className="px-4 py-6">{plan?.productId}</td>
                <td className="px-4 py-6">
                  <span className="font-general-semibold">${plan?.price}</span>
                  /yr
                </td>
                <td
                  className="px-4 py-6 text-nowrap underline cursor-pointer"
                  onClick={() => {
                    setSelectedPlan(plan);
                    setSubscriptionPlanDetails(true);
                  }}
                >
                  View Detail
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubscriptionPlanDetailsPopup
        show={subscriptionPlanDetails}
        onClose={() => {
          setSubscriptionPlanDetails(false);
          setSelectedPlan(null);
        }}
        plan={selectedPlan}
      />
    </>
  );
};

export default SubscriptionPlans;
