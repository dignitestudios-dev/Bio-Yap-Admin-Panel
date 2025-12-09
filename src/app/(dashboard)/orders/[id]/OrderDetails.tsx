"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getHooks } from "@/hooks/useGetRequests";
import PageLoader from "@/components/PageLoader";
import { useUpdateOrderStatus } from "@/hooks/useUpdateRequests";
import DangerPopup from "@/components/DangerPopup";
import toast from "react-hot-toast";
import BackArrow from "@/components/icons/BackArrow";

const OrderDetail = () => {
  const { id } = useParams();
  const { loading, order, getOrderById } = getHooks.useGetOrdersDetails();
  const [status, setStatus] = useState<string>("");
  const { loading: loader, updateOrderStatus } = useUpdateOrderStatus();
  const [cancelReason, setCancelReason] = useState<string>("");
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [activeBtn, setActiveBtn] = useState<string | null>(null);

  const getInitials = (name?: string) => {
    if (!name) return "";
    const words = name.split(" ");
    return words
      .map((w) => w[0].toUpperCase())
      .slice(0, 2)
      .join("");
  };

  useEffect(() => {
    if (id) getOrderById(id as string);
  }, [id]);

  useEffect(() => {
    if (order) setStatus(order.orderStatus);
  }, [order]);

  if (loading || !order) return <PageLoader />;

  const handleStatusChange = async (newStatus: string) => {
    if (!order) return;

    setActiveBtn(newStatus);

    const success = await updateOrderStatus(order._id, newStatus, status);
    if (success) setStatus(newStatus);

    setActiveBtn(null);
  };

  const handleCancelOrder = async () => {
    if (!order || !cancelReason.trim())
      return toast.error("Please enter a reason!");

    setActiveBtn("cancel");

    const success = await updateOrderStatus(
      order._id,
      "cancelled",
      cancelReason
    );
    if (success) {
      setStatus("cancelled");
      setShowCancelPopup(false);
    }

    setActiveBtn(null);
  };

  return (
    <>
      <Link href="/orders">
                 <BackArrow />
      </Link>

      <h1 className="text-2xl font-bold mb-6">Order Details</h1>

      {/* User Info */}
      <div className="bg-white p-6 rounded-xl shadow mb-6 flex items-center gap-6">
        {/* Profile Picture or Initials */}
        {order.user.profilePicture ? (
          <img
            src={order.user.profilePicture}
            alt={order.user.fullName}
            className="h-20 w-20 rounded-full object-cover"
          />
        ) : (
          <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-white font-bold text-2xl">
            {getInitials(order.user.fullName)}
          </div>
        )}

        {/* User Info in a single row with 3 columns */}
        <div className="flex flex-1 justify-between">
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Name</span>
            <span className="text-gray-900">{order.user.fullName}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Email</span>
            <span className="text-gray-900">{order.user.email}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Phone</span>
            <span className="text-gray-900">{order.user.phoneNumber}</span>
          </div>
        </div>
      </div>

      {/* Order Info */}
      <div className="bg-white p-6 rounded-xl shadow mb-6 space-y-2">
        <div className="flex items-center justify-between">
          <span
            className={`px-3 py-1 rounded text-white font-semibold ${
              status === "cancelled" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {status}
          </span>
          <div className="flex gap-3 items-center">
            {status === "inProgress" && (
              <>
                <button
                  disabled={activeBtn === "orderConfirmed"}
                  onClick={() => handleStatusChange("orderConfirmed")}
                  className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg"
                >
                  {activeBtn === "orderConfirmed"
                    ? "Updating..."
                    : "Confirm Order"}
                </button>

                <button
                  disabled={loader}
                  onClick={() => setShowCancelPopup(true)}
                  className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </>
            )}

            {status === "orderConfirmed" && (
              <>
                <button
                  disabled={activeBtn === "inProcess"}
                  onClick={() => handleStatusChange("inProcess")}
                  className="bg-yellow-600 cursor-pointer text-white px-4 py-2 rounded-lg"
                >
                  {activeBtn === "inProcess" ? "In Process..." : "In Process"}
                </button>
              </>
            )}

            {status === "inProcess" && (
              <button
                disabled={activeBtn === "delivered"}
                onClick={() => handleStatusChange("delivered")}
                className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-lg"
              >
                {activeBtn === "delivered"
                  ? "Mark as Delivered..."
                  : "Mark as Delivered"}
              </button>
            )}
          </div>
        </div>
        <p className="text-gray-700">
          Date: {new Date(order.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700">
          Total Amount: <b>${order.totalAmount.toFixed(2)}</b>
        </p>
        <p className="text-gray-700">
          Delivery Address: {order.deliveryAddress}
        </p>
        {order.reason && (
          <p className="text-gray-700">Reason: {order.reason}</p>
        )}
      </div>

      {/* Products List */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-right">Price</th>
                <th className="p-3 text-right">Qty</th>
                <th className="p-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 flex items-center gap-3">
                    <div
                      className="w-16 h-16 bg-cover rounded"
                      style={{ backgroundImage: `url(${item.pictures[0]})` }}
                    />
                    <span className="font-medium">{item.title}</span>
                  </td>
                  <td className="p-3 text-right">${item.price.toFixed(2)}</td>
                  <td className="p-3 text-right">{item.quantity}</td>
                  <td className="p-3 text-right font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4 text-lg font-bold">
          Total: ${order.totalAmount.toFixed(2)}
        </div>
      </div>

      {showCancelPopup && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg space-y-4">
            <h3 className="text-lg font-bold">Cancel Order</h3>
            <p className="text-gray-700 text-sm">
              Please provide a reason for cancellation:
            </p>

            <textarea
              className="border w-full p-2 rounded resize-none"
              rows={3}
              placeholder="Enter cancel reason..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-400 rounded text-white"
                onClick={() => setShowCancelPopup(false)}
              >
                Close
              </button>

              <button
                disabled={activeBtn === "cancel"}
                className="px-4 py-2 bg-red-600 rounded text-white flex items-center justify-center gap-2"
                onClick={handleCancelOrder}
              >
                {activeBtn === "cancel"
                  ? "Confirm Cancel...."
                  : "Confirm Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetail;
