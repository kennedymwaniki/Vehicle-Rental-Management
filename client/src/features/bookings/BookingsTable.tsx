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
  console.log("BookingsData:", BookingsData);

  const [editBookingId, setEditBookingId] = useState<number | null | undefined>(
    null
  );
  const [bookingData, setBookingData] = useState<Partial<TBooking>>({});
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [newBookingData, setNewBookingData] = useState<Partial<TBooking>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log("Loading:", LoadingBookings);
  console.log("Error:", error);

  const [updateBooking] = bookingsAPI.useUpdateBookingMutation();
  const [deleteBooking] = bookingsAPI.useDeleteBookingMutation();
  const [createBooking] = bookingsAPI.useCreateBookingMutation();

  const handleEdit = (booking: TBooking) => {
    setEditBookingId(booking.bookingId);
    setBookingData(booking);
  };

  // const handleDelete = async (bookingId: number) => {
  //   try {
  //     await deleteBooking(bookingId).unwrap();
  //     toast.success("Booking deleted successfully");
  //   } catch (error) {
  //     toast.error("Failed to delete booking");
  //   }
  // };
  const handleDelete = async (bookingId: number | null | undefined) => {
    if (bookingId !== null && bookingId !== undefined) {
      try {
        await deleteBooking(bookingId).unwrap();
        toast.success("Booking deleted successfully");
      } catch (error) {
        toast.error("Failed to delete booking");
      }
    } else {
      // Handle the case where bookingId is null or undefined
    }
  };

  const handleSaveEdit = async () => {
    try {
      await updateBooking({
        bookingId: editBookingId,
        ...bookingData,
      }).unwrap();
      toast.success("Booking updated successfully");
      setEditBookingId(null);
    } catch (error) {
      toast.error("Failed to update booking");
    }
  };

  const handleCreateBooking = async () => {
    setIsLoading(true);
    try {
      await createBooking(newBookingData).unwrap();
      toast.success("Booking created successfully");
      setIsCreating(false);
      setNewBookingData({});
    } catch (error) {
      toast.error("Failed to create booking");
    } finally {
      setIsLoading(false);
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
                <td className="py-2 px-4 border-b">
                  {editBookingId === booking.bookingId ? (
                    <input
                      type="number"
                      value={bookingData.userId || ""}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          userId: Number(e.target.value),
                        })
                      }
                    />
                  ) : (
                    booking.userId
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editBookingId === booking.bookingId ? (
                    <input
                      type="number"
                      value={bookingData.vehicleId || ""}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          vehicleId: Number(e.target.value),
                        })
                      }
                    />
                  ) : (
                    booking.vehicleId
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editBookingId === booking.bookingId ? (
                    <input
                      type="number"
                      value={bookingData.locationId || ""}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          locationId: Number(e.target.value),
                        })
                      }
                    />
                  ) : (
                    booking.locationId
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editBookingId === booking.bookingId ? (
                    <input
                      type="date"
                      value={bookingData.bookingDate || ""}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          bookingDate: e.target.value,
                        })
                      }
                    />
                  ) : (
                    booking.bookingDate
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editBookingId === booking.bookingId ? (
                    <input
                      type="date"
                      value={bookingData.returnDate || ""}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          returnDate: e.target.value,
                        })
                      }
                    />
                  ) : (
                    booking.returnDate
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editBookingId === booking.bookingId ? (
                    <input
                      type="number"
                      value={bookingData.totalAmount || ""}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          totalAmount: Number(e.target.value),
                        })
                      }
                    />
                  ) : (
                    booking.totalAmount
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editBookingId === booking.bookingId ? (
                    <select
                      value={bookingData.bookingStatus || ""}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          bookingStatus: e.target
                            .value as TBooking["bookingStatus"],
                        })
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Failed">Failed</option>
                    </select>
                  ) : (
                    booking.bookingStatus
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editBookingId === booking.bookingId ? (
                    <>
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                        onClick={handleSaveEdit}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                        onClick={() => setEditBookingId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
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
        {isCreating && (
          <Modal onClose={() => setIsCreating(false)}>
            <div className="mt-4">
              <h3 className="text-xl mb-2">Create New Booking</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateBooking();
                }}
              >
                <div className="mb-2">
                  <label className="block">User ID</label>
                  <input
                    type="number"
                    value={newBookingData.userId || ""}
                    onChange={(e) =>
                      setNewBookingData({
                        ...newBookingData,
                        userId: Number(e.target.value),
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Vehicle ID</label>
                  <input
                    type="number"
                    value={newBookingData.vehicleId || ""}
                    onChange={(e) =>
                      setNewBookingData({
                        ...newBookingData,
                        vehicleId: Number(e.target.value),
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Location ID</label>
                  <input
                    type="number"
                    value={newBookingData.locationId || ""}
                    onChange={(e) =>
                      setNewBookingData({
                        ...newBookingData,
                        locationId: Number(e.target.value),
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Booking Date</label>
                  <input
                    type="date"
                    value={newBookingData.bookingDate || ""}
                    onChange={(e) =>
                      setNewBookingData({
                        ...newBookingData,
                        bookingDate: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Return Date</label>
                  <input
                    type="date"
                    value={newBookingData.returnDate || ""}
                    onChange={(e) =>
                      setNewBookingData({
                        ...newBookingData,
                        returnDate: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Total Amount</label>
                  <input
                    type="number"
                    value={newBookingData.totalAmount || ""}
                    onChange={(e) =>
                      setNewBookingData({
                        ...newBookingData,
                        totalAmount: Number(e.target.value),
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Booking Status</label>
                  <select
                    value={newBookingData.bookingStatus || ""}
                    onChange={(e) =>
                      setNewBookingData({
                        ...newBookingData,
                        bookingStatus: e.target
                          .value as TBooking["bookingStatus"],
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
      </div>
    </div>
  );
};

export default BookingsTable;
