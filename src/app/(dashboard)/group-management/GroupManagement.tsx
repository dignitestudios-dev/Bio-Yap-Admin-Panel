"use client";
import Search from "@/components/icons/Search";
import { deleteHooks } from "@/hooks/useDeleteRequests";
import useDebounceSearch from "@/hooks/useDebounceSearch";
import { getHooks } from "@/hooks/useGetRequests";
import { updateHooks } from "@/hooks/useUpdateRequests";
import { GroupInterface } from "@/lib/types";
import { utils } from "@/lib/utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import CustomPagination from "@/components/CustomPagination";

type SelectedTabs = "0" | "1" | "2";

const GroupManagement = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = useMemo(() => searchParams.get("status"), [searchParams]);

  const [selectedTab, setSelectedTab] = useState<SelectedTabs>("0");
  const [searchValue, setSearchValue] = useState<string>("");

  const searchValueDebounce: string = useDebounceSearch(searchValue);
  const tabs = ["All", "Active", "Inactive"];

  // API Hooks
  const {
    loading: groupsLoading,
    groups,
    totalPages,
    getAllGroups,
  } = getHooks.useGetAllGroups();

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

  const handleGetGroups = async (page?: number) => {
    await getAllGroups(searchValueDebounce, selectedTab, page);
  };

  useEffect(() => {
    handleGetGroups(1);
  }, [searchValueDebounce, selectedTab]);

  const onPageChange = (page: number) => {
    handleGetGroups(page);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="px-4 flex items-center">
          <h2 className="section-heading">Group Management</h2>

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
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <CustomPagination
        loading={groupsLoading}
        totalPages={totalPages}
        onPageChange={onPageChange}
      >
        <div className="bg-white rounded-xl px-4 pb-4 overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-10">
              <tr>
                <th colSpan={9} className="h-[16px] bg-white" />
              </tr>
              <tr className="bg-[#F2FDE0]">
                <th className="px-4 py-5 text-left text-nowrap rounded-s-[8px]">
                  #
                </th>
                <th className="px-4 py-5 text-left text-nowrap">Group Name</th>
                <th className="px-4 py-5 text-left text-nowrap">About</th>
                <th className="px-4 py-5 text-left text-nowrap">Created By</th>
                <th className="px-4 py-5 text-left text-nowrap">Created At</th>
                <th className="px-4 py-5 text-left text-nowrap">Members</th>
                <th className="px-4 py-5 text-left text-nowrap">Posts</th>
                <th className="px-4 py-5 text-left text-nowrap">Status</th>
                <th className="px-4 py-5 text-left text-nowrap rounded-e-[8px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="mt-10">
              {groups?.map((group: GroupInterface, index: number) => (
                <tr key={group._id} className="border-b-1 border-[#D4D4D4]">
                  <td className="px-4 py-6">{index + 1}</td>
                  <td className="px-4 py-6">
                    <div className="flex items-center gap-3">{group?.name}</div>
                  </td>
                  <td className="px-4 py-6">{group?.description}</td>
                  <td className="px-4 py-6">
                    {group?.creator?.fullName || group?.creator?.username || "N/A"}
                  </td>
                  <td className="px-4 py-6">
                    {utils.formatDate(group?.createdAt)}
                  </td>
                  <td className="px-4 py-6">{group?.memberCount || 0}</td>
                  <td className="px-4 py-6">{group?.totalPostsCount || 0}</td>
                  <td
                    className={`px-4 py-6 ${
                      !group?.isDisabled ? "text-[#85D500]" : "text-[#EE0004]"
                    }`}
                  >
                    {!group?.isDisabled ? "Active" : "Inactive"}
                  </td>
                  <td className="px-4 py-6 text-nowrap underline cursor-pointer">
                    <Link href={`/group-management/${group?._id}`}>
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

export default GroupManagement;
