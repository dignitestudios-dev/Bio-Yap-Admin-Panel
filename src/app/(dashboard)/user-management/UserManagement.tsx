"use client";
import CustomPagination from "@/components/CustomPagination";
import Search from "@/components/icons/Search";
import useDebounceSearch from "@/hooks/useDebounceSearch";
import { getHooks } from "@/hooks/useGetRequests";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type SelectedTabs = "" | "0" | "1" | "2";

const UserManagement = () => {
  const tabs = ["All", "Active", "Inactive"];

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = useMemo(() => searchParams.get("status"), [searchParams]);

  const { loading, users, totalPages, getAllUsers } = getHooks.useGetAllUsers();
  const [selectedTab, setSelectedTab] = useState<SelectedTabs>("");
  const [searchValue, setSearhValue] = useState<string>("");

  const searchValueDebounce: string = useDebounceSearch(searchValue);

  useEffect(() => {
    currentTab && ["0", "1", "2"].includes(currentTab)
      ? setSelectedTab(currentTab as SelectedTabs)
      : setSelectedTab("0");
  }, [currentTab]);

  const handleTabChange = (index: SelectedTabs) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("status", index);
    router.push(`?${newParams.toString()}`);
  };

  useEffect(() => {
    getAllUsers(searchValueDebounce, selectedTab);
  }, [searchValueDebounce, selectedTab]);

    const onPageChange = (page: number) => {
      getAllUsers(searchValueDebounce, selectedTab, page);
    };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="px-4 flex items-center">
          <h2 className="section-heading">User Management</h2>

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
                <th className="px-4 py-5 text-left text-nowrap">Name</th>
                <th className="px-4 py-5 text-left text-nowrap">
                  Email Address
                </th>
                <th className="px-4 py-5 text-left text-nowrap">
                  Phone Number
                </th>
                <th className="px-4 py-5 text-left text-nowrap">Location</th>
                <th className="px-4 py-5 text-left text-nowrap">Status</th>
                <th className="px-4 py-5 text-left text-nowrap  rounded-e-[8px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="mt-10">
              {users.map((user, index) => (
                <tr key={index} className="border-b-1 border-[#D4D4D4]">
                  <td className="px-4 py-6">{index + 1}</td>
                  <td className="px-4 py-6">
                    <div className="flex items-center gap-3">
                      <div className="p-[2px] bg-gradient-to-bl from-[#29ABE2] to-[#63CFAC] rounded-full">
                        <div
                          className="h-[43px] w-[43px] rounded-full bg-cover bg-center border border-white"
                          style={{
                            backgroundImage: `url(${user?.profilePicture})`,
                          }}
                        />
                      </div>
                      {user?.fullName}
                    </div>
                  </td>
                  <td className="px-4 py-6">{user?.email}</td>
                  <td className="px-4 py-6 text-nowrap">{user?.phoneNumber}</td>
                  <td className="px-4 py-6">{user?.location}</td>
                  <td
                    className={`px-4 py-6 ${
                      user?.isSuspended ? "text-[#EE0004]" : "text-[#85D500]"
                    }`}
                  >
                    {user?.isSuspended ? "Inactive" : "Active"}
                  </td>
                  <td className="px-4 py-6 text-nowrap underline cursor-pointer">
                    <Link href={`/user-management/${user?._id}`}>
                      View Detail
                    </Link>
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

export default UserManagement;
