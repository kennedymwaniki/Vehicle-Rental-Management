import Users from "../features/Users/Users";
import Hero from "../ui/Hero";
import Navbar from "../ui/Navbar";


const Homepage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Users/>
    </>
  );
};

export default Homepage;
