import usersAPI from "./UserApi"
import { TBooking } from "../../types/types";

const UserBookings = () => {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson).user : null;
  const userId = user?.id;

  const { data, error, isLoading } = usersAPI.useGetUserBookingsByIdQuery(userId, {
    skip: !userId,
  });
  console.log

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading bookings</div>;

  return (
    <div>
      <h1>User Bookings</h1>
      {data?.bookings.length ? (
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Vehicle ID</th>
              <th>Location ID</th>
              <th>Booking Date</th>
              <th>Return Date</th>
              <th>Total Amount</th>
              <th>Status</th>
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
                  {booking.bookingStatus === "Pending" && (
                    <button>Pay</button>
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

