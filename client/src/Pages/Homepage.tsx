import BookingsTable from "../features/bookings/BookingsTable";
import Login from "../features/Login/Login";
import Payments from "../features/Payments/Payments";
import TicketList from "../features/Tickets/TicketList";
import Users from "../features/Users/Users";
import Vehicles from "../features/vehicles/Vehicles";
import Cars from "../ui/Cars";
import Hero from "../ui/Hero";
import Navbar from "../ui/Navbar";
// import AdminDashboard from "./AdminDashboard";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Cars />
      <Login />
      <Users />
      <BookingsTable />
      <Payments />
      <TicketList />
      {/* <AdminDashboard /> */}
      <Vehicles />
    </>
  );
};

export default Homepage;
