import { HiBookOpen, HiOutlineCreditCard } from "react-icons/hi";
import { IoTicket } from "react-icons/io5";
import SummaryCard from "./SummaryCard";
import usersAPI from "../features/Users/UserApi";

const UserSummary = () => {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson).user : null;
  const userId = user?.id;

  const {
    data: AllUserRelations,
    isLoading,
    error,
  } = usersAPI.useGetAllUserRelationsQuery(userId, {
    skip: !userId,
    pollingInterval: 5000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const bookings = AllUserRelations?.bookings || [];
  const tickets = AllUserRelations?.customerSupportTickets || [];

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(
    (booking) => booking.bookingStatus === "Pending"
  ).length;

  const completedBookings = bookings.filter(
    (booking) => booking.bookingStatus === "Completed"
  ).length;

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(
    (ticket) => ticket.status === "open"
  ).length;

  const closedTickets = tickets.filter(
    (ticket) => ticket.status === "closed"
  ).length;

  const totalPayments = bookings
    .filter((booking) => booking.bookingStatus === "Completed")
    .reduce((acc, booking) => Number(acc + booking.totalAmount), 0);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow overflow-y-auto">
        <SummaryCard
          title="Total Bookings"
          count={totalBookings}
          icon={<HiBookOpen className="h-6 w-6 text-blue-600" />}
          color="text-blue-600"
        />
        <SummaryCard
          title="Pending Bookings"
          count={pendingBookings}
          icon={<HiBookOpen className="h-6 w-6 text-red-600" />}
          color="text-red-600"
        />
        <SummaryCard
          title="Completed Bookings"
          count={completedBookings}
          icon={<HiBookOpen className="h-6 w-6 text-green-600" />}
          color="text-green-600"
        />
        <SummaryCard
          title="Total Tickets"
          count={totalTickets}
          icon={<IoTicket className="h-6 w-6 text-blue-600" />}
          color="text-blue-600"
        />
        <SummaryCard
          title="Open Tickets"
          count={openTickets}
          icon={<IoTicket className="h-6 w-6 text-red-600" />}
          color="text-red-600"
        />
        <SummaryCard
          title="Closed Tickets"
          count={closedTickets}
          icon={<IoTicket className="h-6 w-6 text-green-600" />}
          color="text-green-600"
        />
        <SummaryCard
          title="Total Payments"
          count={totalPayments}
          icon={<HiOutlineCreditCard className="h-6 w-6 text-yellow-600" />}
          color="text-yellow-600"
        />
      </div>
    </div>
  );
};

export default UserSummary;
