import usersAPI from "./UserApi";
import { TBooking } from "../../types/types";

const UserBookings = () => {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson).user : null;
  const userId = user?.id;

  const { data, error, isLoading } = usersAPI.useGetUserBookingsByIdQuery(
    userId,
    {
      skip: !userId,
    }
  );
  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading bookings</div>;

  return (
    <div>
      <h1>User Bookings</h1>
      {data?.bookings.length ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Booking ID</th>
              <th className="py-2 px-4 border-b">Vehicle ID</th>
              <th className="py-2 px-4 border-b">Location ID</th>
              <th className="py-2 px-4 border-b">Booking Date</th>
              <th className="py-2 px-4 border-b">Return Date</th>
              <th className="py-2 px-4 border-b">Total Amount</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.bookings.map((booking: TBooking) => (
              <tr key={booking.bookingId}>
                <td>{booking.bookingId}</td>
                <td>{booking.vehicleId}</td>
                <td>{booking.locationId}</td>
                <td>{booking.bookingDate}</td>
                <td>{booking.returnDate}</td>
                <td>{booking.totalAmount}</td>
                <td>{booking.bookingStatus}</td>
                <td>
                  {booking.bookingStatus === "Pending" && <button>Pay</button>}
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
