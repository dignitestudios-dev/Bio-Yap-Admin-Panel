"use client";
import Search from "@/components/icons/Search";
import ReportedGroups from "@/components/ReportedGroups";
import ReportedPosts from "@/components/ReportedPosts";
import ReportedUsers from "@/components/ReportedUsers";
import useDebounceSearch from "@/hooks/useDebounceSearch";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type SelectedTabs = "" | "0" | "1" | "2";

const ReportedContent = () => {
  const tabs = ["Users", "Posts", "Groups"];

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = useMemo(() => searchParams.get("type"), [searchParams]);

  const [selectedTab, setSelectedTab] = useState<SelectedTabs>("");
  const [searchValue, setSearchValue] = useState<string>("");

  console.log("searchValue: ", searchValue);

  const searchValueDebounce: string = useDebounceSearch(searchValue);

  console.log("searchValueDebounce: ", searchValueDebounce);

  useEffect(() => {
    currentTab && ["0", "1", "2"].includes(currentTab)
      ? setSelectedTab(currentTab as SelectedTabs)
      : setSelectedTab("0");
  }, [currentTab]);

  const handleTabChange = (index: SelectedTabs) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("type", index);
    router.push(`?${newParams.toString()}`);
  };

  const handleGetReportedUsers = () => {
    console.log("reported user searched: ", searchValueDebounce);
  };

  useEffect(() => {
    handleGetReportedUsers();
  }, [searchValueDebounce]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="px-4 flex items-center">
          <h2 className="section-heading">Reported Content</h2>

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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="bg-white rounded-xl px-4 pb-4 overflow-y-auto h-full">
        {selectedTab === "0" ? (
          <ReportedUsers searchValueDebounce={searchValueDebounce} />
        ) : selectedTab === "1" ? (
          <ReportedPosts searchValueDebounce={searchValueDebounce} />
        ) : selectedTab === "2" ? (
          <ReportedGroups searchValueDebounce={searchValueDebounce} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ReportedContent;
