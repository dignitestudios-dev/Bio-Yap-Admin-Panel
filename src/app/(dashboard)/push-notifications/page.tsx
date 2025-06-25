"use client";
import BButton from "@/components/BButton";
import CreateCommunityFrom from "@/components/CreateCommunityForm";
import CreateNotificationForm from "@/components/CreateNotificationForm";
import CustomPagination from "@/components/CustomPagination";
import Search from "@/components/icons/Search";
import useDebounceSearch from "@/hooks/useDebounceSearch";
import { notificationHooks } from "@/hooks/useNotificationRequests";
import { utils } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const PushNotifications = () => {
  const { loading, notifications, totalPages, getNotifications } =
    notificationHooks.useGetNotifications();

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [searchValue, setSearhValue] = useState<string>("");
  const searchValueDebounce: string = useDebounceSearch(searchValue);

  const handleGetNotifications = async (page?: number) => {
    await getNotifications(searchValueDebounce, page);
  };

  useEffect(() => {
    handleGetNotifications(1);
  }, [searchValueDebounce]);

  const onPageChange = (page: number) => {
    handleGetNotifications(page);
  };

  return (
    <>
      <div className="px-4 flex items-center justify-between">
        <h2 className="section-heading">Push Notification</h2>

        <div className="flex items-center gap-4">
          <div className="bg-white rounded-lg w-[250px] h-[50px] flex items-center gap-2 px-4">
            <Search />

            <input
              type="text"
              placeholder="Search"
              className="outline-none flex-1 h-full"
              onChange={(e) => setSearhValue(e.target.value)}
            />
          </div>

          <BButton title="Create New" onBtnClick={() => setShowAlert(true)} />
        </div>
      </div>
      {/* Notification Table */}
      <CustomPagination
        loading={loading}
        totalPages={totalPages}
        onPageChange={onPageChange}
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
                <th className="px-4 py-5 text-left text-nowrap">Description</th>
                <th className="px-4 py-5 text-left text-nowrap">Date</th>
                <th className="px-4 py-5 text-left text-nowrap">Time</th>
                <th className="px-4 py-5 text-left text-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="mt-10">
              {notifications.map((notification, index) => (
                <tr
                  key={notification._id}
                  className="border-b-1 border-[#D4D4D4]"
                >
                  <td className="px-4 py-6">{index + 1}</td>
                  <td className="px-4 py-6">{notification.description}</td>
                  <td className="px-4 py-6 text-nowrap">
                    {utils.formatDate(notification.createdAt)}
                  </td>
                  <td className="px-4 py-6">
                    {utils.formatTimeTo12Hour(notification.createdAt)}
                  </td>
                  <td
                    className={`px-4 py-6 ${
                      notification?.isSent
                        ? "text-[#34C759]"
                        : "text-yellow-500"
                    }`}
                  >
                    {utils.toTitleCase(
                      notification?.isSent ? "delivered" : "pending"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CustomPagination>

      <CreateNotificationForm
        show={showAlert}
        onClose={() => setShowAlert(false)}
        onSuccess={() => handleGetNotifications(1)}
      />
    </>
  );
};

export default PushNotifications;
