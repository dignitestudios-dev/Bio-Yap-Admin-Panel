"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import BButton from "@/components/BButton";
import DangerPopup from "@/components/DangerPopup";
import BackArrow from "@/components/icons/BackArrow";
import Delete from "@/components/icons/Delete";
import { getHooks } from "@/hooks/useGetRequests";
import { deleteHooks } from "@/hooks/useDeleteRequests";
import { updateHooks } from "@/hooks/useUpdateRequests";
import PageLoader from "@/components/PageLoader";

const GroupDetails = () => {
  const params = useParams();
  const router = useRouter();
  const { loading, group, getGroupById } = getHooks.useGetGroupDetails();
  const { loading: deleteLoading, deleteGroup } = deleteHooks.useDeleteGroup();
  const { loading: disableLoading, disableGroup } =
    updateHooks.useDisableGroup();

  const [showAlert, setShowAlert] = useState<{
    delete: boolean;
    disable: boolean;
  }>({ delete: false, disable: false });

  useEffect(() => {
    if (params.id) {
      getGroupById(params.id as string);
    }
  }, [params.id]);

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

  const handleDisableGroup = async () => {
    if (!group?._id) return;
    const success = await disableGroup(group._id, !group.isDisabled);
    if (success) {
      handleToggleDisablePopup(false);
      getGroupById(group._id);
    }
  };

  const handleDeleteGroup = async () => {
    if (!group?._id) return;
    const success = await deleteGroup(group._id);
    if (success) {
      router.push("/group-management");
    }
  };

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <Link
            href={"/group-management"}
            className="outline-none cursor-pointer"
          >
            <BackArrow />
          </Link>

          <div className="flex justify-between items-center">
            <h1 className="section-heading">Group Details</h1>

            <div className="flex gap-2 items-center">
              <div
                className="bg-[#FF3B30] rounded-[10px] h-[48px] w-[44px] cursor-pointer active:scale-[0.95] transition-all flex justify-center items-center"
                onClick={() => handleToggleDeletePopup(true)}
              >
                <Delete />
              </div>

              <BButton
                title={group?.isDisabled ? "Enable" : "Disable"}
                w="fit"
                onBtnClick={() => handleToggleDisablePopup(true)}
                loading={disableLoading}
              />
            </div>
          </div>

          <div className="rounded-lg bg-white flex gap-5 items-center py-5 px-8">
            <div className="p-[1.5px] bg-primary rounded-full">
              <div
                className="h-[100px] w-[100px] rounded-full bg-cover bg-center border-[3px] border-white"
                style={{
                  backgroundImage: `url(${
                    group?.coverImage || "/images/profile.jpg"
                  })`,
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-general-semibold text-xl">{group?.name}</h2>
              <div>
                <p className="text-desc text-sm">About:</p>
                <p className="text-desc text-sm">{group?.description}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl flex flex-col h-full min-h-[500px] overflow-y-auto">
            <div className="px-4 py-5 flex items-center separator">
              <h2 className="text-2xl font-general-semibold">
                Members ({group?.totalMembersCount || 0})
              </h2>
            </div>

            <div className="px-4 pb-4 overflow-y-auto">
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
                    <th className="px-4 py-5 text-left text-nowrap">
                      Location
                    </th>
                    <th className="px-4 py-5 text-left text-nowrap  rounded-e-[8px]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="mt-10">
                  {group?.members?.map((member, index) => (
                    <tr
                      key={member._id}
                      className="border-b-1 border-[#D4D4D4]"
                    >
                      <td className="px-4 py-6">{index + 1}</td>
                      <td className="px-4 py-6">
                        <div className="flex items-center gap-3">
                          {member.user.fullName}
                        </div>
                      </td>
                      <td className="px-4 py-6">{member.user.email}</td>
                      <td className="px-4 py-6 text-nowrap">
                        {member.user.phoneNumber}
                      </td>
                      <td className="px-4 py-6">{member.role}</td>
                      <td className="px-4 py-6 text-nowrap underline cursor-pointer">
                        <Link href={`/user-management/${member.user._id}`}>
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <DangerPopup
            title={`${group?.isDisabled ? "Enable" : "Disable"} Group`}
            desc={`Are you sure you want to ${
              group?.isDisabled ? "enable" : "disable"
            } this group?`}
            doneTitle={`Yes, ${group?.isDisabled ? "Enable" : "Disable"} Now`}
            show={showAlert.disable}
            onClose={() => handleToggleDisablePopup(false)}
            onContinue={handleDisableGroup}
            loading={disableLoading}
          />

          <DangerPopup
            title="Delete Group"
            desc="Are you sure you want to delete this group?"
            doneTitle="Yes, Delete Now"
            show={showAlert.delete}
            onClose={() => handleToggleDeletePopup(false)}
            onContinue={handleDeleteGroup}
            loading={deleteLoading}
          />
        </>
      )}
    </>
  );
};

export default GroupDetails;
