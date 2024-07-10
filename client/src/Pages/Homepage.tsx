import BookingsTable from "../features/bookings/BookingsTable";
import Payments from "../features/Payments/Payments";
import Users from "../features/Users/Users";
import Hero from "../ui/Hero";
import Navbar from "../ui/Navbar";
const Homepage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Users />
      <BookingsTable />
      <Payments />
    </>
  );
};

export default Homepage;
