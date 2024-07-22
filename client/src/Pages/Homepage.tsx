import Footer from "../components/Footer";
import FeatureCars from "../ui/Featurecars";
import Hero from "../ui/Hero";
import Navbar from "../ui/Navbar";
import About from "../components/About";

const Homepage = () => {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <About />
      <FeatureCars />
      <Footer />
    </div>
  );
};

export default Homepage;
