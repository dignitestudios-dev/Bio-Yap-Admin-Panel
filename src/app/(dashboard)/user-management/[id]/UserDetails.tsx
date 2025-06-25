"use client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import BackArrow from "@/components/icons/BackArrow";
import Delete from "@/components/icons/Delete";
import BButton from "@/components/BButton";
import Badge from "@/components/icons/Badge";
import Phone from "@/components/icons/Phone";
import Location from "@/components/icons/Location";
import BTab from "@/components/BTab";
import Posts from "@/components/Posts";
import Followers from "@/components/Followers";
import Following from "@/components/Following";
import BasicInfo from "@/components/BasicInfo";
import DangerPopup from "@/components/DangerPopup";
import { getHooks } from "@/hooks/useGetRequests";
import PageLoader from "@/components/PageLoader";
import { postHooks } from "@/hooks/usePostRequests";
import { deleteHooks } from "@/hooks/useDeleteRequests";
import Image from "next/image";

type SelectedTabs = "" | "0" | "1" | "2" | "3";

const UserDetails = () => {
  const tabs = ["Basic Info", "Posts", "Followers", "Following"];
  const { loading, user, setUser, getUserById } = getHooks.useGetUsersDetails();
  const { loading: suspendLoading, toggleSuspendUser } =
    postHooks.useToggleSuspendUser();
  const { loading: deleteLoading, deleteUser } = deleteHooks.useDeleteUser();

  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const currentTab: SelectedTabs = useMemo(
    () => searchParams.get("tab"),
    [searchParams]
  ) as SelectedTabs;

  const [selectedTab, setSelectedTab] = useState<SelectedTabs>("");
  const [showAlert, setShowAlert] = useState<{
    delete: boolean;
    disable: boolean;
  }>({ delete: false, disable: false });

  const handleTabChange = (index: SelectedTabs) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("tab", index);
    router.push(`?${newParams.toString()}`);
  };

  useEffect(() => {
    currentTab && ["0", "1", "2", "3"].includes(currentTab)
      ? setSelectedTab(currentTab as SelectedTabs)
      : setSelectedTab("0");
  }, [currentTab]);

  useEffect(() => {
    id && getUserById(id as string);
  }, [id]);

  const handleToggleDisablePopup = (value: boolean) => {
    setShowAlert((prev) => ({
      ...prev,
      disable: value,
    }));
  };

  const handleToggleDeletePopup = (value: boolean) => {
    setShowAlert((prev) => ({
      ...prev,
      delete: value,
    }));
  };

  const handleToggleDisableUser = async () => {
    const suspendUser = !user?.isSuspended;
    const success = await toggleSuspendUser(id as string, suspendUser);
    if (success)
      setUser((prev: any) => ({ ...prev, isSuspended: suspendUser }));

    handleToggleDisablePopup(false);
  };

  const handleDeleteUser = async () => {
    const success = await deleteUser(id as string);
    if (success) router.push("/user-management");

    handleToggleDeletePopup(false);
  };

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <Link href="/user-management" className="outline-none">
            <BackArrow />
          </Link>

          <div className="flex justify-between items-center">
            <h1 className="section-heading">User Details</h1>

            <div className="flex gap-2 items-center">
              <div
                className="bg-[#FF3B30] rounded-[10px] h-[48px] w-[44px] cursor-pointer active:scale-[0.95] transition-all flex justify-center items-center"
                onClick={() => handleToggleDeletePopup(true)}
              >
                <Delete />
              </div>

              <BButton
                title={user?.isSuspended ? "Enable" : "Disable"}
                w="fit"
                onBtnClick={() => handleToggleDisablePopup(true)}
              />
            </div>
          </div>

          <div className="rounded-lg bg-white flex gap-5 items-center py-5 px-8">
            <div className="p-[1.5px] bg-primary rounded-full">
              <div
                className="h-[100px] w-[100px] rounded-full bg-cover bg-center border-[3px] border-white"
                style={{
                  backgroundImage: `url(${user?.profilePicture})`,
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h2 className="font-general-semibold text-xl">
                  {user?.fullName}
                </h2>
                {user?.earnedBadges?.length ? (
                  <Image
                    src={`/badges/${
                      user?.earnedBadges[user?.earnedBadges.length - 1]?._id
                    }.svg`}
                    alt={
                      user?.earnedBadges[user?.earnedBadges.length - 1]?.name
                    }
                    width={32}
                    height={32}
                  />
                ) : (
                  ""
                )}
              </div>

              <p className="text-sm">@{user?.username}</p>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm text-[#707070]">
                  <Phone />
                  <p> {user?.phoneNumber}</p>
                </div>
                <span className="text-[#707070] font-extralight text-sm">
                  |
                </span>
                <div className="flex items-center gap-1 text-sm text-[#707070]">
                  <Location />
                  <p> {user?.location}</p>
                </div>
              </div>

              <p className="text-desc text-sm">{user?.Bio}</p>
            </div>
          </div>

          <div className="rounded-lg bg-white flex items-center p-1 w-fit shadow-[0px_4px_19.4px_0px_#0000000D]">
            {tabs.map((tab, index) => (
              <BTab
                key={index}
                title={tab}
                active={selectedTab === String(index)}
                onBtnClick={() =>
                  handleTabChange(String(index) as SelectedTabs)
                }
              />
            ))}
          </div>

          <div className="rounded-lg bg-white h-full min-h-[500px] overflow-y-auto">
            {selectedTab === "0" ? (
              <BasicInfo user={user} />
            ) : selectedTab === "1" ? (
              <Posts />
            ) : selectedTab === "2" ? (
              <Followers />
            ) : selectedTab === "3" ? (
              <Following />
            ) : (
              ""
            )}
          </div>

          <DangerPopup
            title={user?.isSuspended ? "Enable User" : "Disable User"}
            desc={`Are you sure you want to ${
              user?.isSuspended ? "enable" : "disable"
            } this user?`}
            doneTitle={`Yes, ${user?.isSuspended ? "Enable" : "Disable"} Now`}
            show={showAlert.disable}
            onClose={() => handleToggleDisablePopup(false)}
            onContinue={handleToggleDisableUser}
            loading={suspendLoading}
          />

          <DangerPopup
            title="Delete User"
            desc="Are you sure you want to delete this user?"
            doneTitle="Yes, Delete Now"
            show={showAlert.delete}
            onClose={() => handleToggleDeletePopup(false)}
            onContinue={handleDeleteUser}
            loading={deleteLoading}
          />
        </>
      )}
    </>
  );
};

export default UserDetails;
