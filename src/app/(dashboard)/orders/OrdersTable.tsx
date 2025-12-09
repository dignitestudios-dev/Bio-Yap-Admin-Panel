"use client";
import CustomPagination from "@/components/CustomPagination";
import Search from "@/components/icons/Search";
import useDebounceSearch from "@/hooks/useDebounceSearch";
import { getHooks } from "@/hooks/useGetRequests";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type SelectedTabs = string;

const OrdersTable = () => {
  const tabs = [
    "All",
    "In Progress",
    "Order Confirmed",
    "In Process",
    "Delivered",
    "Cancelled",
  ];

  const tabStatusMap: { [key: number]: string } = {
    0: "", // All
    1: "inProgress",
    2: "orderConfirmed",
    3: "inProcess",
    4: "delivered",
    5: "cancelled",
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = useMemo(() => searchParams.get("status"), [searchParams]);

  const { loading, orders, totalPages, getAllOrders } =
    getHooks.useGetAllOrders();
  const [selectedTab, setSelectedTab] = useState<string>("0");
  const [searchValue, setSearhValue] = useState<string>("");
  const searchValueDebounce: string = useDebounceSearch(searchValue);

  useEffect(() => {
    currentTab && ["0", "1", "2"].includes(currentTab)
      ? setSelectedTab(currentTab as SelectedTabs)
      : setSelectedTab("0");
  }, [currentTab]);

  const handleTabChange = (index: string) => {
    setSelectedTab(index);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("status", index);
    router.push(`?${newParams.toString()}`);
  };

  // API call
  useEffect(() => {
    const status = tabStatusMap[Number(selectedTab)];
    getAllOrders(searchValueDebounce, status);
  }, [searchValueDebounce, selectedTab]);

  const onPageChange = (page: number) => {
    getAllOrders(searchValueDebounce, selectedTab, page);
  };
  console.log(orders, "orders");
  const getInitials = (name?: string) => {
    if (!name) return "";
    const words = name.split(" ");
    const initials = words.map((word) => word[0].toUpperCase()).slice(0, 2);
    return initials.join("");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="px-4 flex items-center">
          <h2 className="section-heading">Order History</h2>

          <div className="flex items-center gap-5 ms-10">
            {tabs.map((tab, index) => (
              <p
                key={index}
                className={`cursor-pointer hover:underline ${
                  selectedTab === String(index)
                    ? "text-[#2C2C2E] underline font-general-medium"
                    : "text-desc"
                }`}
                onClick={() => handleTabChange(String(index) as SelectedTabs)}
              >
                {tab}
              </p>
            ))}
          </div>
        </div>

            {/* <div className="bg-white rounded-lg w-[250px] h-[50px] flex items-center gap-2 px-4">
            <Search />

            <input
                type="text"
                placeholder="Search"
                className="outline-none flex-1 h-full"
                onChange={(e) => setSearhValue(e.target.value)}
            />
            </div> */}
      </div>
      {/* Users Table */}
      <CustomPagination
        loading={loading}
        onPageChange={onPageChange}
        totalPages={totalPages}
      >
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
                <th className="px-4 py-5 text-left text-nowrap">Customer</th>
                <th className="px-4 py-5 text-left text-nowrap">
                  Delivery Address
                </th>
                <th className="px-4 py-5 text-left text-nowrap">Status</th>
                <th className="px-4 py-5 text-left text-nowrap">
                  Total Amount
                </th>
                <th className="px-4 py-5 text-left text-nowrap">Date</th>
                <th className="px-4 py-5 text-left text-nowrap rounded-e-[8px]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="mt-10">
              {orders?.map((order, index) => (
                <tr key={order._id} className="border-b border-[#D4D4D4]">
                  <td className="px-4 py-6">{index + 1}</td>

                  {/* Customer */}
                  <td className="px-4 py-6">
                    <div className="flex items-center gap-3">
                      {order.userId?.profilePicture ? (
                        <img
                          src={order.userId.profilePicture}
                          alt={order.userId.fullName}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                          {getInitials(order.userId?.fullName)}
                        </div>
                      )}
                      <span className="font-medium">
                        {order.userId?.fullName}
                      </span>
                    </div>
                  </td>

                  {/* Delivery Address */}
                  <td className="px-4 py-6">{order.deliveryAddress}</td>

                  {/* Status */}
                  <td
                    className={`px-4 py-6 capitalize font-semibold ${
                      order.orderStatus === "cancelled"
                        ? "text-[#EE0004]"
                        : "text-[#85D500]"
                    }`}
                  >
                    {order.orderStatus}
                  </td>

                  {/* Total Amount */}
                  <td className="px-4 py-6 font-medium">
                    ${order.totalAmount.toFixed(2)}
                  </td>

                  {/* Created Date */}
                  <td className="px-4 py-6">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  {/* View Details */}
                  <td className="px-4 py-6 underline cursor-pointer text-blue-600">
                    <Link href={`/orders/${order._id}`}>View Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CustomPagination>
    </>
  );
};

export default OrdersTable;
