import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import ProfileMenu from "./ProfileMenu";
import logo from "../assets/kenny blue-Photoroom.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const fullName = user?.user.fullName;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 relative">
      <div className="flex items-center">
        <button
          onClick={toggleMenu}
          className="text-gray-800 focus:outline-none mr-4 md:hidden"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <img src={logo} alt="Logo" className="h-[60px] md:h-[80px]" />
      </div>
      <nav className="hidden md:flex md:flex-row md:items-center md:space-x-6">
        <ul className="flex flex-col md:flex-row gap-2 text-center md:space-x-3">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="cars">Vehicles</Link>
          </li>
          <li>
            <Link to="/contact">Contact us</Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center">
        {!isAuthenticated ? (
          <>
            <Link to="login">
              <button className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">
                Login
              </button>
            </Link>
            <Link to="register">
              <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600">
                Register
              </button>
            </Link>
          </>
        ) : (
          <ProfileMenu fullName={fullName} />
        )}
      </div>
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 mx-4 bg-gray-400 rounded-lg shadow-lg md:hidden">
          <ul className="flex flex-col items-center py-4 space-y-4 text-white">
            <li className="w-full text-center py-2">
              <Link to="/">Home</Link>
            </li>
            <li className="w-full text-center py-2">
              <Link to="/about">About</Link>
            </li>
            
            <li className="w-full text-center py-2">
              <Link to="cars">Vehicles</Link>
            </li>
            <li className="w-full text-center py-2">
              <Link to="footer">Contact us</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
