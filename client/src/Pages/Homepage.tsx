import BookingsTable from "../features/bookings/BookingsTable";
import Payments from "../features/Payments/Payments";
import TicketList from "../features/Tickets/TicketList";
import Users from "../features/Users/Users";
import Hero from "../ui/Hero";
import Navbar from "../ui/Navbar";
import AdminDashboard from "./AdminDashboard";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Users />
      <BookingsTable />
      <Payments />
      <TicketList />
      <AdminDashboard />
    </>
  );
};

export default Homepage;
