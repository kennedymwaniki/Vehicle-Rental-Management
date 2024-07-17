import { FaCrown, FaMoneyBillWave, FaLaptop } from "react-icons/fa";

const About = () => {
  return (
    <section className="bg-gray-900 text-white py-16 mt-4 mb-4">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">
          Our Services & Benefits
        </h2>
        <p className="text-center mb-12 max-w-3xl mx-auto">
          To make renting easy and hassle-free, we provide a variety of services
          and advantages. We have you covered with a variety of vehicles and
          flexible rental terms.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FaCrown className="text-4xl text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-300">
              We offer a wide range of high-quality vehicles to choose from,
              including luxury cars, SUVs, vans, and more.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FaMoneyBillWave className="text-4xl text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
            <p className="text-gray-300">
              Our rental rates are highly competitive and affordable, allowing
              our customers to enjoy their trips without breaking the bank.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FaLaptop className="text-4xl text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Convenient Online Booking
            </h3>
            <p className="text-gray-300">
              With our easy-to-use online booking system, customers can quickly
              and conveniently reserve their rental car from anywhere, anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
