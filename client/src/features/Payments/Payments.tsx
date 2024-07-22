import { paymentsAPI } from "./PaymentsApi";
import { TPayment } from "../../types/types";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { LuClipboardEdit } from "react-icons/lu";
import { MdAutoDelete } from "react-icons/md";

import Modal from "../../ui/Modal";

const Payments = () => {
  const [editPaymentId, setEditPaymentId] = useState<number | null | undefined>(
    null
  );
  const [paymentData, setPaymentData] = useState<Partial<TPayment>>({});
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [newPaymentData, setNewPaymentData] = useState<Partial<TPayment>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const {
    data: paymentsData,
    error,
    isLoading: isPaymentsLoading,
  } = paymentsAPI.useGetPaymentsQuery();

  const [updatePayment] = paymentsAPI.useUpdatePaymentMutation();
  const [deletePayment] = paymentsAPI.useDeletePaymentMutation();
  const [createPayment] = paymentsAPI.useCreatePaymentMutation();

  console.log("Loading:", isPaymentsLoading);
  console.log("Error:", error);
  console.log("Payments:", paymentsData);

  const handleEdit = (payment: TPayment) => {
    setEditPaymentId(payment.paymentId);
    setPaymentData(payment);
  };

  const handleDelete = async (paymentId: number) => {
    try {
      await deletePayment(paymentId).unwrap();
      toast.success("Payment deleted successfully");
    } catch (error) {
      toast.error("Failed to delete payment");
    }
  };

  const handleSaveEdit = async () => {
    setIsUpdating(true);
    try {
      await updatePayment({
        paymentId: editPaymentId,
        ...paymentData,
      }).unwrap();
      toast.success("Payment updated successfully");
      setEditPaymentId(null);
    } catch (error) {
      toast.error("Failed to update payment");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCreatePayment = async () => {
    setIsLoading(true);
    try {
      await createPayment(newPaymentData).unwrap();
      toast.success("Payment created successfully");
      setIsCreating(false);
      setNewPaymentData({});
    } catch (error) {
      toast.error("Failed to create payment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-center" richColors />
      <h2 className="text-yellow-400 text-2xl mb-4">Payments</h2>
      <div className="">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-slate-400">
              <th className="py-2 px-4 border-b">Payment ID</th>
              <th className="py-2 px-4 border-b">Booking ID</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Payment Status</th>
              <th className="py-2 px-4 border-b">Payment Date</th>
              <th className="py-2 px-4 border-b">Payment Method</th>
              <th className="py-2 px-4 border-b">Transaction ID</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentsData?.map((payment: TPayment) => (
              <tr key={payment.paymentId}>
                <td className="py-2 px-4 border-b">{payment.paymentId}</td>
                <td className="py-2 px-4 border-b">{payment.bookingId}</td>
                <td className="py-2 px-4 border-b">{payment.amount}</td>
                <td className="py-2 px-4 border-b">{payment.paymentStatus}</td>
                <td className="py-2 px-4 border-b">{payment.paymentDate}</td>
                <td className="py-2 px-4 border-b">{payment.paymentMethod}</td>
                <td className="py-2 px-4 border-b">{payment.transactionId}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                    onClick={() => handleEdit(payment)}
                  >
                    <LuClipboardEdit />
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded mr-2 hover:bg-red-700"
                    onClick={() => handleDelete(payment.paymentId || 0)}
                  >
                    <MdAutoDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600"
          onClick={() => setIsCreating(true)}
        >
          Add New Payment
        </button>
        {isCreating && (
          <Modal onClose={() => setIsCreating(false)}>
            <div className="mt-4">
              <h3 className="text-xl mb-2">Create New Payment</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreatePayment();
                }}
              >
                <div className="mb-2">
                  <label className="block">Booking ID</label>
                  <input
                    type="number"
                    value={newPaymentData.bookingId || ""}
                    onChange={(e) =>
                      setNewPaymentData({
                        ...newPaymentData,
                        bookingId: Number(e.target.value),
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Amount</label>
                  <input
                    type="number"
                    value={newPaymentData.amount || ""}
                    onChange={(e) =>
                      setNewPaymentData({
                        ...newPaymentData,
                        amount: Number(e.target.value),
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Payment Status</label>
                  <select
                    value={newPaymentData.paymentStatus || ""}
                    onChange={(e) =>
                      setNewPaymentData({
                        ...newPaymentData,
                        paymentStatus: e.target
                          .value as TPayment["paymentStatus"],
                      })
                    }
                    className="border p-2 rounded w-full"
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block">Payment Date</label>
                  <input
                    type="date"
                    value={newPaymentData.paymentDate || ""}
                    onChange={(e) =>
                      setNewPaymentData({
                        ...newPaymentData,
                        paymentDate: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Payment Method</label>
                  <input
                    type="text"
                    value={newPaymentData.paymentMethod || ""}
                    onChange={(e) =>
                      setNewPaymentData({
                        ...newPaymentData,
                        paymentMethod: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Transaction ID</label>
                  <input
                    type="text"
                    value={newPaymentData.transactionId || ""}
                    onChange={(e) =>
                      setNewPaymentData({
                        ...newPaymentData,
                        transactionId: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="flex items-center">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create"}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={() => setIsCreating(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}
        {editPaymentId !== null && (
          <Modal onClose={() => setEditPaymentId(null)}>
            <div className="mt-4">
              <h3 className="text-xl mb-2">Edit Payment</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveEdit();
                }}
              >
                <div className="mb-2">
                  <label className="block">Booking ID</label>
                  <input
                    type="number"
                    value={paymentData.bookingId || ""}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        bookingId: Number(e.target.value),
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Amount</label>
                  <input
                    type="number"
                    value={paymentData.amount || ""}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        amount: Number(e.target.value),
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Payment Status</label>
                  <select
                    value={paymentData.paymentStatus || ""}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        paymentStatus: e.target
                          .value as TPayment["paymentStatus"],
                      })
                    }
                    className="border p-2 rounded w-full"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block">Payment Date</label>
                  <input
                    type="date"
                    value={paymentData.paymentDate || ""}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        paymentDate: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Payment Method</label>
                  <input
                    type="text"
                    value={paymentData.paymentMethod || ""}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        paymentMethod: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Transaction ID</label>
                  <input
                    type="text"
                    value={paymentData.transactionId || ""}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        transactionId: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="flex items-center">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Updating..." : "Save"}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={() => setEditPaymentId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Payments;
