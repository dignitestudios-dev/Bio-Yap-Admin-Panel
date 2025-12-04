"use client";
import React, { useEffect, useState } from "react";
import Search from "@/components/icons/Search";
import CustomPagination from "@/components/CustomPagination";
import { getHooks } from "@/hooks/useGetRequests";
import { postHooks } from "@/hooks/usePostRequests";
import { utils } from "@/lib/utils";
import DangerPopup from "@/components/DangerPopup";
// import ConfirmRejectPopup from "@/components/ConfirmRejectPopup";

const WithDrawalRequest = () => {
  const { loading, withdrawals, totalPages, getWithdrawals } =
    getHooks.useGetWithdrawalRequests();

  const {
    loading: processing,
    accept,
    // reject,
  } = postHooks.useProcessWithdrawal();

  const [searchValue, setSearhValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [refresh, setRefresh] = useState(false);
  const [acceptModal, setAcceptModal] = useState<{
    show: boolean;
    id?: string;
  }>({ show: false });
  const [rejectModal, setRejectModal] = useState<{
    show: boolean;
    id?: string;
  }>({ show: false });

  useEffect(() => {
    getWithdrawals("pending", page, 20);
  }, [page, refresh]);

  const onPageChange = (p: number) => {
    setPage(p);
  };

  const handleAccept = async (id?: string) => {
    if (!id) return;
    const ok = await accept(id);
    setAcceptModal({ show: false });
    if (ok) setRefresh((s) => !s);
  };

  //   const handleReject = async (id?: string, reason?: string) => {
  //     if (!id) return;
  //     const ok = await reject(id, reason);
  //     setRejectModal({ show: false });
  //     if (ok) setRefresh((s) => !s);
  //   };

  return (
    <>
      <div className="px-4 flex items-center justify-between">
        <h2 className="section-heading">Withdrawal Requests</h2>

        {/* <div className="bg-white rounded-lg w-[250px] h-[50px] flex items-center gap-2 px-4">
          <Search />

          <input
            type="text"
            placeholder="Search"
            className="outline-none flex-1 h-full"
            onChange={(e) => setSearhValue(e.target.value)}
          />
        </div> */}
      </div>

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
                <th className="px-4 py-5 text-left text-nowrap">Email</th>
                <th className="px-4 py-5 text-left text-nowrap">Diamonds</th>
                <th className="px-4 py-5 text-left text-nowrap">
                  Amount (USD)
                </th>
                <th className="px-4 py-5 text-left text-nowrap">
                  Requested At
                </th>
                <th className="px-4 py-5 text-left text-nowrap  rounded-e-[8px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="mt-10">
              {withdrawals && withdrawals.length > 0 ? (
                withdrawals.map((w: any, index: number) => (
                  <tr key={w._id} className="border-b-1 border-[#D4D4D4]">
                    <td className="px-4 py-6">{index + 1}</td>
                    <td className="px-4 py-6">{w.userId?.fullName || "-"}</td>
                    <td className="px-4 py-6">{w.userId?.email || "-"}</td>
                    <td className="px-4 py-6">{w.diamonds}</td>
                    <td className="px-4 py-6">${w.amountInUSD}</td>
                    <td className="px-4 py-6">
                      {utils.formatDate(w.createdAt)}
                    </td>
                    <td className="px-4 py-6 text-nowrap flex gap-2">
                      <button
                        className="bg-green-500 text-white py-2 px-3 rounded cursor-pointer"
                        onClick={() =>
                          setAcceptModal({ show: true, id: w._id })
                        }
                        disabled={processing}
                      >
                        Accept
                      </button>
                      {/* <button
                        className="bg-red-500 text-white py-2 px-3 rounded"
                        onClick={() =>
                          setRejectModal({ show: true, id: w._id })
                        }
                        disabled={processing}
                      >
                        Reject
                      </button> */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No withdrawal requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CustomPagination>
      <DangerPopup
        title="Approve Withdrawal"
        desc="Are you sure you want to approve this withdrawal request?"
        show={acceptModal.show}
        onClose={() => setAcceptModal({ show: false })}
        onContinue={() => handleAccept(acceptModal.id)}
        loading={processing}
        doneTitle="Yes, Approve"
        cancelTitle="No, Keep It"
      />

      {/* <ConfirmRejectPopup
        show={rejectModal.show}
        onClose={() => setRejectModal({ show: false })}
        onConfirm={(reason) => handleReject(rejectModal.id, reason)}
        loading={processing}
      /> */}
    </>
  );
};

export default WithDrawalRequest;
