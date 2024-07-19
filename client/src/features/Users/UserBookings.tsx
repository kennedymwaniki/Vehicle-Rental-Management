import { useState } from "react";
import usersAPI from "./UserApi";
import { TBooking } from "../../types/types";

const UserBookings = () => {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson).user : null;
  const userId = user?.id;
  const [payingBookingId, setPayingBookingId] = useState<
    number | null | undefined
  >(null);

  const { data, error, isLoading } = usersAPI.useGetUserBookingsByIdQuery(
    userId,
    {
      skip: !userId,
      pollingInterval: 6000,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading bookings</div>;

  const handleCheckout = async (bookingId: number, amount: number) => {
    console.log(bookingId, amount);
    setPayingBookingId(bookingId);
    const response = await fetch(
      "https://vehicle-rental-backend-eg4t.onrender.com/api/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: Number(bookingId),
          amount: Number(amount),
        }),
      }
    );

    const { checkoutUrl } = await response.json();
    setPayingBookingId(null);

    window.location.href = checkoutUrl;
  };

  return (
    <div>
      <h1>User Bookings</h1>
      {data?.bookings.length ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 border-b">Booking ID</th>
              <th className="py-2  border-b">Vehicle ID</th>
              <th className="py-2  border-b">Location ID</th>
              <th className="py-2  border-b">Booking Date</th>
              <th className="py-2  border-b">Return Date</th>
              <th className="py-2  border-b">Total Amount</th>
              <th className="py-2  border-b">Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.bookings.map((booking: TBooking) => (
              <tr key={booking.bookingId}>
                <td className="py-2 px-6">{booking.bookingId}</td>
                <td className="py-2 px-6">{booking.vehicleId}</td>
                <td className="py-2 px-6">{booking.locationId}</td>
                <td className="py-2 px-6">{booking.bookingDate}</td>
                <td className="py-2 px-6">{booking.returnDate}</td>
                <td className="py-2 px-6">{booking.totalAmount}</td>
                <td
                  className={`py-2 px-6 ${
                    booking.bookingStatus === "Pending"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {booking.bookingStatus}
                </td>
                <td>
                  {booking.bookingStatus === "Pending" && (
                    <button
                      className="bg-green-600 p-2"
                      onClick={() =>
                        handleCheckout(booking.bookingId, booking.totalAmount)
                      }
                    >
                      {payingBookingId === booking.bookingId
                        ? "Paying..."
                        : "Pay Now"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
};

export default UserBookings;
