import { getHooks } from "@/hooks/useGetRequests";
import Link from "next/link";
import React, { useEffect } from "react";
import CustomPagination from "./CustomPagination";

const ReportedUsers: React.FC<{ searchValueDebounce: string }> = ({
  searchValueDebounce,
}) => {
  const { loading, reportedUsers, totalPages, getReportedUsers } =
    getHooks.useGetReportedUsers();

  useEffect(() => {
    getReportedUsers(searchValueDebounce);
  }, [searchValueDebounce]);

  const onPageChange = (page: number) => {
    getReportedUsers(searchValueDebounce, page);
  };

  return (
    <>
      <div className="flex flex-col h-full overflow-y-auto">
        <div className="flex items-center pt-4 mb-4">
          <h2 className="text-2xl font-general-semibold">Reported Users</h2>
        </div>

        <CustomPagination
          totalPages={totalPages}
          loading={loading}
          onPageChange={onPageChange}
        >
          <div className="bg-white rounded-xl pb-4 overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 z-10">
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
              <tbody className="">
                {reportedUsers?.map((user, index) => (
                  <tr key={index} className="border-b-1 border-[#D4D4D4]">
                    <td className="px-4 py-6">{index + 1}</td>
                    <td className="px-4 py-6">
                      <div className="flex items-center gap-3">
                        <div className="p-[2px] bg-gradient-to-bl from-[#29ABE2] to-[#63CFAC] rounded-full">
                          <div
                            className="h-[43px] w-[43px] rounded-full bg-cover bg-center border border-white"
                            style={{
                              backgroundImage: `url(${"/images/profile.jpg"})`,
                            }}
                          />
                        </div>
                        {user?.reportedUser?.fullName}
                      </div>
                    </td>
                    <td className="px-4 py-6">{user?.reportedUser?.email}</td>
                    <td className="px-4 py-6 text-nowrap">
                      {user?.reportedUser?.phoneNumber}
                    </td>
                    <td className="px-4 py-6">
                      {user?.reportedUser?.location}
                    </td>
                    <td
                      className={`px-4 py-6 ${
                        !user?.reportedUser?.isSuspended
                          ? "text-[#85D500]"
                          : "text-[#EE0004]"
                      }`}
                    >
                      {user?.reportedUser?.isSuspended ? "Inactive" : "Active"}
                    </td>
                    <td className="px-4 py-6 text-nowrap underline cursor-pointer">
                      <Link
                        href={`/user-management/${user?.reportedUser?._id}`}
                      >
                        View Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CustomPagination>
      </div>

      {/* <div className="flex flex-col h-full overflow-y-auto">
        <div className="pt-4 w-full bg-white">
          <h3 className="section-heading !text-2xl">Reported Users</h3>
        </div>

        <CustomPagination
          totalPages={totalPages}
          loading={loading}
          onPageChange={onPageChange}
        >
          <div className="bg-white rounded-xl pb-4 overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-12 z-10">
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
                {reportedUsers?.map((user, index) => (
                  <tr key={index} className="border-b-1 border-[#D4D4D4]">
                    <td className="px-4 py-6">{index + 1}</td>
                    <td className="px-4 py-6">
                      <div className="flex items-center gap-3">
                        <div className="p-[2px] bg-gradient-to-bl from-[#29ABE2] to-[#63CFAC] rounded-full">
                          <div
                            className="h-[43px] w-[43px] rounded-full bg-cover bg-center border border-white"
                            style={{
                              backgroundImage: `url(${"/images/profile.jpg"})`,
                            }}
                          />
                        </div>
                        {user?.reportedUser?.fullName}
                      </div>
                    </td>
                    <td className="px-4 py-6">{user?.reportedUser?.email}</td>
                    <td className="px-4 py-6 text-nowrap">
                      {user?.reportedUser?.phoneNumber}
                    </td>
                    <td className="px-4 py-6">
                      {user?.reportedUser?.location}
                    </td>
                    <td
                      className={`px-4 py-6 ${
                        !user?.reportedUser?.isSuspended
                          ? "text-[#85D500]"
                          : "text-[#EE0004]"
                      }`}
                    >
                      {user?.reportedUser?.isSuspended ? "Inactive" : "Active"}
                    </td>
                    <td className="px-4 py-6 text-nowrap underline cursor-pointer">
                      <Link
                        href={`/user-management/${user?.reportedUser?._id}`}
                      >
                        View Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CustomPagination>
      </div> */}
    </>
  );
};

export default ReportedUsers;
