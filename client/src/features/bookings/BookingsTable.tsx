import { useForm, SubmitHandler } from "react-hook-form";
import { bookingsAPI } from "./BookingsApi";
import { TBooking } from "../../types/types";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { MdAutoDelete } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import Modal from "../../ui/Modal";

const BookingsTable = () => {
  const {
    data: BookingsData,
    error,
    isLoading: LoadingBookings,
    isError,
  } = bookingsAPI.useGetBookingsQuery();

  const [editBookingId, setEditBookingId] = useState<number | null | undefined>(
    null
  );
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const [updateBooking] = bookingsAPI.useUpdateBookingMutation();
  const [deleteBooking] = bookingsAPI.useDeleteBookingMutation();
  const [createBooking] = bookingsAPI.useCreateBookingMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TBooking>();

  const onSubmit: SubmitHandler<TBooking> = async (data) => {
    try {
      if (editBookingId) {
        await updateBooking({ bookingId: editBookingId, ...data }).unwrap();
        toast.success("Booking updated successfully");
        setEditBookingId(null);
      } else {
        await createBooking(data).unwrap();
        toast.success("Booking created successfully");
        setIsCreating(false);
      }
      reset();
    } catch (error) {
      toast.error(
        editBookingId ? "Failed to update booking" : "Failed to create booking"
      );
    }
  };

  const handleEdit = (booking: TBooking) => {
    setEditBookingId(booking.bookingId);
    Object.keys(booking).forEach((key) => {
      setValue(key as keyof TBooking, booking[key as keyof TBooking]);
    });
  };

  const handleDelete = async (bookingId: number) => {
    try {
      await deleteBooking(bookingId).unwrap();
      toast.success("Booking deleted successfully");
    } catch (error) {
      toast.error("Failed to delete booking");
    }
  };

  if (LoadingBookings) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Error: {error.toString()}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-center" />

      <h2 className="text-yellow-400 text-2xl mb-4">Bookings</h2>
      <div className="">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-slate-400">
              <th className="py-2 px-4 border-b">Booking ID</th>
              <th className="py-2 px-4 border-b">User ID</th>
              <th className="py-2 px-4 border-b">Vehicle ID</th>
              <th className="py-2 px-4 border-b">Location ID</th>
              <th className="py-2 px-4 border-b">Booking Date</th>
              <th className="py-2 px-4 border-b">Return Date</th>
              <th className="py-2 px-4 border-b">Total Amount</th>
              <th className="py-2 px-4 border-b">Booking Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {BookingsData?.map((booking: TBooking) => (
              <tr key={booking.bookingId}>
                <td className="py-2 px-4 border-b">{booking.bookingId}</td>
                <td className="py-2 px-4 border-b">{booking.userId}</td>
                <td className="py-2 px-4 border-b">{booking.vehicleId}</td>
                <td className="py-2 px-4 border-b">{booking.locationId}</td>
                <td className="py-2 px-4 border-b">{booking.bookingDate}</td>
                <td className="py-2 px-4 border-b">{booking.returnDate}</td>
                <td className="py-2 px-4 border-b">{booking.totalAmount}</td>
                <td className="py-2 px-4 border-b">{booking.bookingStatus}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                    onClick={() => handleEdit(booking)}
                  >
                    <LuClipboardEdit />
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(booking.bookingId)}
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
          Add New Booking
        </button>
        {(isCreating || editBookingId) && (
          <Modal
            onClose={() => {
              setIsCreating(false);
              setEditBookingId(null);
              reset();
            }}
          >
            <div className="mt-4">
              <h3 className="text-xl mb-2">
                {editBookingId ? "Edit Booking" : "Create New Booking"}
              </h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2">
                  <label className="block">User ID</label>
                  <input
                    type="number"
                    {...register("userId", { required: "User ID is required" })}
                    className="border p-2 rounded w-full"
                  />
                  {errors.userId && (
                    <span className="text-red-500">
                      {errors.userId.message}
                    </span>
                  )}
                </div>
                <div className="mb-2">
                  <label className="block">Vehicle ID</label>
                  <input
                    type="number"
                    {...register("vehicleId", {
                      required: "Vehicle ID is required",
                    })}
                    className="border p-2 rounded w-full"
                  />
                  {errors.vehicleId && (
                    <span className="text-red-500">
                      {errors.vehicleId.message}
                    </span>
                  )}
                </div>
                <div className="mb-2">
                  <label className="block">Location ID</label>
                  <input
                    type="number"
                    {...register("locationId", {
                      required: "Location ID is required",
                    })}
                    className="border p-2 rounded w-full"
                  />
                  {errors.locationId && (
                    <span className="text-red-500">
                      {errors.locationId.message}
                    </span>
                  )}
                </div>
                <div className="mb-2">
                  <label className="block">Booking Date</label>
                  <input
                    type="date"
                    {...register("bookingDate", {
                      required: "Booking Date is required",
                    })}
                    className="border p-2 rounded w-full"
                  />
                  {errors.bookingDate && (
                    <span className="text-red-500">
                      {errors.bookingDate.message}
                    </span>
                  )}
                </div>
                <div className="mb-2">
                  <label className="block">Return Date</label>
                  <input
                    type="date"
                    {...register("returnDate", {
                      required: "Return Date is required",
                    })}
                    className="border p-2 rounded w-full"
                  />
                  {errors.returnDate && (
                    <span className="text-red-500">
                      {errors.returnDate.message}
                    </span>
                  )}
                </div>
                <div className="mb-2">
                  <label className="block">Total Amount</label>
                  <input
                    type="number"
                    {...register("totalAmount", {
                      required: "Total Amount is required",
                    })}
                    className="border p-2 rounded w-full"
                  />
                  {errors.totalAmount && (
                    <span className="text-red-500">
                      {errors.totalAmount.message}
                    </span>
                  )}
                </div>
                <div className="mb-2">
                  <label className="block">Booking Status</label>
                  <select
                    {...register("bookingStatus", {
                      required: "Booking Status is required",
                    })}
                    className="border p-2 rounded w-full"
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                  </select>
                  {errors.bookingStatus && (
                    <span className="text-red-500">
                      {errors.bookingStatus.message}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                  >
                    {editBookingId ? "Update" : "Create"}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={() => {
                      setIsCreating(false);
                      setEditBookingId(null);
                      reset();
                    }}
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

export default BookingsTable;
