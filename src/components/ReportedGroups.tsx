"use client";
import Search from "@/components/icons/Search";
import useDebounceSearch from "@/hooks/useDebounceSearch";
import { getHooks } from "@/hooks/useGetRequests";
import { utils } from "@/lib/utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import CustomPagination from "./CustomPagination";

type SelectedTabs = "0" | "1" | "2";

const ReportedGroups: React.FC<{ searchValueDebounce: string }> = ({
  searchValueDebounce,
}) => {
  const groups: {
    name: string;
    about: string;
    createdBy: string;
    createdAt: string;
    members: number;
    posts: number;
    status: boolean;
  }[] = [
    {
      name: "Resident Case Discussions",
      about:
        "A group for medical residents to discuss clinical case studies and diagnostic approaches.",
      createdBy: "dr_smith",
      createdAt: "2023-07-10T10:00:00Z",
      members: 340,
      posts: 92,
      status: true,
    },
    {
      name: "Rural Healthcare Providers",
      about:
        "Support group for clinicians working in rural or underserved areas across the U.S.",
      createdBy: "nurse_kelly",
      createdAt: "2022-12-03T08:30:00Z",
      members: 176,
      posts: 58,
      status: true,
    },
    {
      name: "Critical Care Nursing Forum",
      about:
        "Focused on ICU nursing care standards, procedures, and continuous learning.",
      createdBy: "cc_nurse_lead",
      createdAt: "2023-09-18T14:45:00Z",
      members: 289,
      posts: 103,
      status: true,
    },
    {
      name: "Physician Assistants Network",
      about:
        "A space for PAs to collaborate, discuss cases, and share educational resources.",
      createdBy: "pa_lisa",
      createdAt: "2023-03-22T09:15:00Z",
      members: 412,
      posts: 77,
      status: true,
    },
    {
      name: "Telemedicine Best Practices",
      about:
        "Discuss tools, workflows, and standards for effective virtual care delivery.",
      createdBy: "dr_jones",
      createdAt: "2024-01-05T11:20:00Z",
      members: 208,
      posts: 34,
      status: true,
    },
    {
      name: "Surgical Residents Group",
      about:
        "A discussion space for surgical residents to collaborate and learn from case reviews.",
      createdBy: "dr_brown",
      createdAt: "2023-06-01T07:50:00Z",
      members: 365,
      posts: 112,
      status: true,
    },
    {
      name: "Healthcare Ethics Roundtable",
      about:
        "Group for discussing ethical dilemmas and principles in clinical medicine and research.",
      createdBy: "ethics_admin",
      createdAt: "2022-11-10T15:00:00Z",
      members: 98,
      posts: 26,
      status: false,
    },
    {
      name: "Medical Technology & AI",
      about:
        "Exploring the role of AI, tools, and tech innovations in modern healthcare.",
      createdBy: "dr_chen",
      createdAt: "2024-02-17T13:10:00Z",
      members: 243,
      posts: 59,
      status: true,
    },
    {
      name: "Infectious Disease Network",
      about:
        "For ID specialists to share updates, CDC alerts, and treatment discussions.",
      createdBy: "id_specialist",
      createdAt: "2023-08-29T10:25:00Z",
      members: 314,
      posts: 88,
      status: true,
    },
    {
      name: "Nursing Students of America",
      about:
        "Support and discussion group for nursing students across all U.S. programs.",
      createdBy: "student_nurse",
      createdAt: "2023-10-12T16:45:00Z",
      members: 521,
      posts: 71,
      status: true,
    },
  ];

  const tabs = ["All", "Active", "Inactive"];

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = useMemo(() => searchParams.get("status"), [searchParams]);

  const { loading, totalPages, reportedGroups, getReportedGroups } =
    getHooks.useGetReportedGroups();

  const [selectedTab, setSelectedTab] = useState<SelectedTabs>("0");

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
    getReportedGroups(selectedTab, searchValueDebounce);
  }, [searchValueDebounce]);

  const onPageChange = (page: number) => {
    getReportedGroups(selectedTab, searchValueDebounce, page);
  };

  return (
    <>
      <div className="flex items-center w-full bg-white py-4 sticky top-0 z-10">
        <h2 className="text-2xl font-general-semibold">Reported Groups</h2>

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
      {/* Users Table */}
      <CustomPagination
        loading={loading}
        onPageChange={onPageChange}
        totalPages={totalPages}
      >
        <table className="w-full">
          <thead className="sticky top-0 z-10">
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
              <th className="px-4 py-5 text-left text-nowrap  rounded-e-[8px]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="mt-10">
            {reportedGroups?.map((group, index) => (
              <tr key={index} className="border-b-1 border-[#D4D4D4]">
                <td className="px-4 py-6">{index + 1}</td>
                <td className="px-4 py-6">
                  <div className="flex items-center gap-3">
                    {group?.groupId?.name}
                  </div>
                </td>
                <td className="px-4 py-6">{group?.groupId?.description}</td>
                <td className="px-4 py-6">{group?.user?.fullName}</td>
                <td className="px-4 py-6">
                  {utils.formatDate(group?.createdAt)}
                </td>
                <td className="px-4 py-6">{100}</td>
                <td className="px-4 py-6">{21}</td>
                <td
                  className={`px-4 py-6 ${
                    !group?.groupId?.isDisabled
                      ? "text-[#85D500]"
                      : "text-[#EE0004]"
                  }`}
                >
                  {!group?.groupId?.isDisabled ? "Active" : "Inactive"}
                </td>
                <td className="px-4 py-6 text-nowrap underline cursor-pointer">
                  <Link href={`/group-management/${group?.groupId?._id}`}>
                    View Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CustomPagination>
    </>
  );
};

export default ReportedGroups;
