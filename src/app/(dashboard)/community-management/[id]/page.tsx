"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import BButton from "@/components/BButton";
import DangerPopup from "@/components/DangerPopup";
import BackArrow from "@/components/icons/BackArrow";
import Delete from "@/components/icons/Delete";
import EditCommunityFrom from "@/components/EditCommunityForm";
import { getHooks } from "@/hooks/useGetRequests";
import PageLoader from "@/components/PageLoader";
import { useParams, useRouter } from "next/navigation";
import CustomPagination from "@/components/CustomPagination";
import { deleteHooks } from "@/hooks/useDeleteRequests";
import { updateHooks } from "@/hooks/useUpdateRequests";

type FormDataType = {
  title: string;
  description: string;
};

const CommunityDetails = () => {
  const router = useRouter();
  const { id } = useParams();

  const { loading, totalPages, communityDetails, getCommunityMembers } =
    getHooks.useGetCommunityDetails();
  const { loading: loadingDelete, deleteCommunity } =
    deleteHooks.useDeleteCommunity();

  const { loading: loadingDisable, disableCommunity } =
    updateHooks.useDisableCommunity();

  const [showAlert, setShowAlert] = useState<{
    delete: boolean;
    disable: boolean;
    edit: boolean;
  }>({ delete: false, disable: false, edit: false });
  const [refresh, setRefresh] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
  });

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
  const handleToggleEditForm = (value: boolean) => {
    setFormData({
      title: communityDetails?.community?.name || "",
      description: communityDetails?.community?.description || "",
    });
    setShowAlert((prev) => ({
      ...prev,
      edit: value,
    }));
  };

  const handleDisableCommunity = async () => {
    if (!id) return;
    const success = await disableCommunity(
      id as string,
      !communityDetails?.community?.isDisabled
    );
    if (success) {
      setRefresh((prev) => !prev);
      handleToggleDisablePopup(false);
    }
  };

  const handleDeleteCommunity = async () => {
    if (!id) return;
    const success = await deleteCommunity(id as string);
    if (success) {
      router.push("/community-management");
      handleToggleDeletePopup(false);
    }
  };

  useEffect(() => {
    id && getCommunityMembers(id as string);
  }, [id, refresh]);

  const onPageChange = (page: number) => {
    id && getCommunityMembers(id as string, page);
  };

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <Link href={"/community-management"} className="outline-none">
            <BackArrow />
          </Link>

          <div className="flex justify-between items-center">
            <h1 className="section-heading">Community Details</h1>

            <div className="flex gap-2 items-center">
              <div
                className="bg-[#FF3B30] rounded-[10px] h-[48px] w-[44px] cursor-pointer active:scale-[0.95] transition-all flex justify-center items-center"
                onClick={() => handleToggleDeletePopup(true)}
              >
                <Delete />
              </div>

              <BButton
                title={
                  communityDetails?.community?.isDisabled ? "Enable" : "Disable"
                }
                w="fit"
                varient="secondary"
                onBtnClick={() => handleToggleDisablePopup(true)}
              />

              <BButton
                title="Edit"
                w="fit"
                onBtnClick={() => handleToggleEditForm(true)}
              />
            </div>
          </div>

          <div className="rounded-lg bg-white py-5 px-8">
            <h3 className="sub-text mb-2">Description:</h3>
            <p className="list-disc ps-6">
              {communityDetails?.community?.description ||
                "No description available for this community."}
            </p>
          </div>

          <div className="bg-white rounded-xl flex flex-col h-full min-h-[500px] overflow-y-auto">
            <div className="px-4 py-5 flex items-center separator">
              <h2 className="text-2xl font-general-semibold">Members</h2>
            </div>

            <CustomPagination
              loading={loading}
              totalPages={totalPages}
              onPageChange={onPageChange}
            >
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
                    {communityDetails?.members?.map((user, index) => (
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
                            {user.fullName}
                          </div>
                        </td>
                        <td className="px-4 py-6">{user?.email}</td>
                        <td className="px-4 py-6 text-nowrap">
                          {user?.phoneNumber}
                        </td>
                        <td className="px-4 py-6">{user?.location}</td>
                        <td className="px-4 py-6 text-nowrap underline cursor-pointer">
                          <Link href={`/user-management/${user?._id}`}>
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CustomPagination>
          </div>

          <DangerPopup
            title={`${communityDetails?.community?.isDisabled ? "Enable" : "Disable"} Community`}
            desc={`Are you sure you want to ${
              communityDetails?.community?.isDisabled ? "enable" : "disable"
            } this community?`}
            doneTitle={`Yes, ${communityDetails?.community?.isDisabled ? "Enable" : "Disable"} Now`}
            show={showAlert.disable}
            onClose={() => handleToggleDisablePopup(false)}
            onContinue={handleDisableCommunity}
            loading={loadingDisable}
          />

          <DangerPopup
            title="Delete Community"
            desc="Are you sure you want to disable this community?"
            doneTitle="Yes, Delete Now"
            show={showAlert.delete}
            onClose={() => handleToggleDeletePopup(false)}
            onContinue={handleDeleteCommunity}
            loading={loadingDelete}
          />

          <EditCommunityFrom
            show={showAlert.edit}
            onClose={() => handleToggleEditForm(false)}
            communityId={id as string}
            formData={formData}
            setFormData={setFormData}
            setRefresh={setRefresh}
          />
        </>
      )}
    </>
  );
};

export default CommunityDetails;
