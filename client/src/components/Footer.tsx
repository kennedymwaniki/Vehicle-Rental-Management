import {
  FaLinkedin,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Kenny Automotives</h2>
            <p className="mb-4 text-gray-300">
              We are a well-known car rental service that has many partners in
              each region to connect with you to assist in your trip in
              meetings, events, holidays or long trips.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaEnvelope size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Our Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Career
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Work Hours</h3>
            <p className="mb-2 text-gray-300">9 AM - 5 PM, Monday - Saturday</p>
            <p className="mb-2 text-gray-300">+234 (819) 345-0000</p>
            <p className="text-gray-300">
              Our Support and Sales team is available 24/7 to answer your
              queries
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
