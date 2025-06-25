import { utils } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import useDebounceSearch from "@/hooks/useDebounceSearch";
import React, { useEffect, useMemo, useState } from "react";
import PostDetailsPopup from "./PostDetailsPopup";
import CustomPagination from "./CustomPagination";
import { getHooks } from "@/hooks/useGetRequests";

type SelectedTabs = "0" | "1" | "2" | "3" | "4";

const ReportedPosts: React.FC<{ searchValueDebounce: string }> = ({
  searchValueDebounce,
}) => {
  const tabs = [
    "All",
    "Normal Post",
    "Job Posts",
    "Educational Post",
    "Group Post",
  ];

  // const posts: {
  //   title: string;
  //   desc: string;
  //   category: "Normal Post" | "Job Posts" | "Educational Post" | "Group Post";
  //   createdAt: string;
  // }[] = [
  //   {
  //     title: "Post-Round Observations",
  //     desc: "Completed morning rounds with the internal medicine team. Several complex cases today involving cardiovascular and endocrine management.",
  //     category: "Normal Post",
  //     createdAt: "2025-05-19T08:30:00Z",
  //   },
  //   {
  //     title: "Clinical Tip: Blood Culture Collection",
  //     desc: "Always ensure proper aseptic technique and collect from two separate sites when ordering blood cultures to reduce contamination risk.",
  //     category: "Educational Post",
  //     createdAt: "2025-05-18T14:00:00Z",
  //   },
  //   {
  //     title: "Attending a Cardiology Webinar",
  //     desc: "Registered for an upcoming webinar on advanced heart failure management. Looking forward to updates on current treatment protocols.",
  //     category: "Normal Post",
  //     createdAt: "2025-05-17T10:15:00Z",
  //   },
  //   {
  //     title: "Forming a Journal Review Group",
  //     desc: "Starting a virtual group to review recent publications in JAMA and NEJM. Weekly sessions, open to all interested healthcare professionals.",
  //     category: "Group Post",
  //     createdAt: "2025-05-16T18:45:00Z",
  //   },
  //   {
  //     title: "End of Shift Summary",
  //     desc: "Completed evening shift in the ICU. Key focus was stabilization of two critical patients requiring ventilator support and continuous monitoring.",
  //     category: "Normal Post",
  //     createdAt: "2025-05-15T21:00:00Z",
  //   },
  //   {
  //     title: "Update on Clinical Guidelines",
  //     desc: "Reviewed the latest ADA guidelines for type 2 diabetes management. Significant emphasis on GLP-1 receptor agonists and cardiovascular outcomes.",
  //     category: "Educational Post",
  //     createdAt: "2025-05-14T11:00:00Z",
  //   },
  //   {
  //     title: "Patient Safety Reminder",
  //     desc: "Reinforcing proper medication reconciliation at discharge to prevent errors and improve patient adherence to treatment plans.",
  //     category: "Normal Post",
  //     createdAt: "2025-05-13T07:30:00Z",
  //   },
  //   {
  //     title: "Daily ICU Briefing",
  //     desc: "Participated in multidisciplinary ICU huddle. Discussed ventilator weaning protocols and infection control measures.",
  //     category: "Normal Post",
  //     createdAt: "2025-05-12T06:45:00Z",
  //   },
  //   {
  //     title: "Resident Education Session",
  //     desc: "Facilitated a teaching session on sepsis recognition and initial management as part of internal medicine residency training.",
  //     category: "Educational Post",
  //     createdAt: "2025-05-11T13:20:00Z",
  //   },
  //   {
  //     title: "Collaborative Study Group",
  //     desc: "Forming a study group for board preparation with a focus on internal medicine. Weekly virtual meetings to review high-yield material.",
  //     category: "Group Post",
  //     createdAt: "2025-05-10T09:00:00Z",
  //   },
  // ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = useMemo(
    () => searchParams.get("post-type"),
    [searchParams]
  );
  const { loading, totalPages, reportedPosts, getReportedPosts } =
    getHooks.useGetReportedPosts();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<SelectedTabs>("0");
  const [showPostDetail, setShowPostDetail] = useState<boolean>(false);
  const [selectedPostDetails, setSelectedPostDetails] = useState<{
    id: string | null;
    type: string | null;
  }>({
    id: null,
    type: null,
  });

  useEffect(() => {
    currentTab && ["0", "1", "2", "3", "4"].includes(currentTab)
      ? setSelectedTab(currentTab as SelectedTabs)
      : setSelectedTab("0");
  }, [currentTab]);

  const handleTabChange = (index: SelectedTabs) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("post-type", index);
    router.push(`?${newParams.toString()}`);
  };

  useEffect(() => {
    getReportedPosts(selectedTab, searchValueDebounce);
  }, [selectedTab, refresh, searchValueDebounce]);

  const onPageChange = (page: number) => {
    getReportedPosts(selectedTab, searchValueDebounce, page);
  };

  return (
    <>
      <div className="flex flex-col h-full overflow-y-auto">
        <div className="flex items-center pt-4">
          <h2 className="text-2xl font-general-semibold">Reported Posts</h2>

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

        <CustomPagination
          totalPages={totalPages}
          loading={loading}
          onPageChange={onPageChange}
        >
          <div className="bg-white rounded-xl pb-4 overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 z-10">
                <tr>
                  <th colSpan={7} className="h-[16px] bg-white" />
                </tr>
                <tr className="bg-[#F2FDE0]">
                  <th className="px-4 py-5 text-left text-nowrap rounded-s-[8px]">
                    #
                  </th>
                  <th className="px-4 py-5 text-left text-nowrap">
                    Post Title
                  </th>
                  <th className="px-4 py-5 text-left text-nowrap">
                    Description
                  </th>
                  <th className="px-4 py-5 text-left text-nowrap">Category</th>
                  <th className="px-4 py-5 text-left text-nowrap">
                    Date Posted
                  </th>
                  <th className="px-4 py-5 text-left text-nowrap  rounded-e-[8px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="mt-10">
                {reportedPosts?.map((post, index) => (
                  <tr key={index} className="border-b-1 border-[#D4D4D4]">
                    <td className="px-4 py-6">{index + 1}</td>
                    <td className="px-4 py-6">{post?.post?.title}</td>
                    <td className="px-4 py-6">{post?.post?.description}</td>
                    <td className="px-4 py-6 text-nowrap">
                      {utils.toTitleCase(post?.postType)}
                    </td>
                    <td className="px-4 py-6">
                      {utils.formatDate(post.createdAt)}
                    </td>
                    <td className="px-4 py-6 text-nowrap underline cursor-pointer">
                      <p
                        onClick={() => {
                          setSelectedPostDetails({
                            id: post?.post?._id,
                            type: post?.postType,
                          });
                          setShowPostDetail(true);
                        }}
                      >
                        View
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CustomPagination>
      </div>

      <PostDetailsPopup
        postDetails={selectedPostDetails}
        show={showPostDetail}
        onClose={() => setShowPostDetail(false)}
        setRefresh={setRefresh}
      />
    </>
  );
};

export default ReportedPosts;
