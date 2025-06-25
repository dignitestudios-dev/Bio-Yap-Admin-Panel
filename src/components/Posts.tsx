import { utils } from "@/lib/utils";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import PostDetailsPopup from "./PostDetailsPopup";
import { getHooks } from "@/hooks/useGetRequests";
import CustomPagination from "./CustomPagination";

type SelectedTabs = "0" | "1" | "2" | "3" | "4";

const Posts = () => {
  const tabs = [
    "All",
    "Normal Post",
    "Job Posts",
    "Educational Post",
    "Group Post",
  ];

  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = useMemo(
    () => searchParams.get("post-type"),
    [searchParams]
  );

  const { loading, posts, totalPages, getPostsOfUser } =
    getHooks.useGetUserPostsById();
  const [selectedTab, setSelectedTab] = useState<SelectedTabs>("0");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [selectedPostDetails, setSelectedPostDetails] = useState<{
    id: string | null;
    type: string | null;
  }>({
    id: null,
    type: null,
  });
  const [showPostDetail, setShowPostDetail] = useState<boolean>(false);

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
    id && getPostsOfUser(id as string, selectedTab);
  }, [id, selectedTab, refresh]);

  const onPageChange = (page: number) => {
    id && getPostsOfUser(id as string, selectedTab, page);
  };

  return (
    <>
      <div className="flex flex-col h-full overflow-y-auto pr-4 pb-4">
        <div className="px-4 py-5 flex items-center separator">
          <h2 className="text-2xl font-general-semibold">Posts</h2>

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
          <div className="bg-white rounded-xl overflow-y-auto">
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
                {posts?.map((post, index) => (
                  <tr key={index} className="border-b-1 border-[#D4D4D4]">
                    <td className="px-4 py-6">{index + 1}</td>
                    <td className="px-4 py-6">{post?.title}</td>
                    <td className="px-4 py-6">{post?.description}</td>
                    <td className="px-4 py-6 text-nowrap">
                      {utils.toTitleCase(post?.type)}
                    </td>
                    <td className="px-4 py-6">
                      {utils.formatDate(post?.datePosted)}
                    </td>
                    <td className="px-4 py-6 text-nowrap underline cursor-pointer">
                      <p
                        onClick={() => {
                          setSelectedPostDetails({
                            id: post?.id,
                            type: post?.type,
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

export default Posts;
