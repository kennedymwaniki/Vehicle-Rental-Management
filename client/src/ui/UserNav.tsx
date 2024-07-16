import { HiOutlineUser, HiBookOpen, HiOutlineCreditCard } from "react-icons/hi";
import { FaCar } from "react-icons/fa6";
import { IoTicket, IoHome } from "react-icons/io5";
import { MdOutlineExitToApp } from "react-icons/md";
import { Link } from "react-router-dom";

const UserNav = () => {
  return (
    <>
      <div className="flex flex-col h-full bg-blue-600 p-4 text-white">
        <nav className="flex flex-col h-full">
          <div className="mb-8">
            <h1 className="text-xl font-bold">User Dashboard</h1>
          </div>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2">
              <IoHome className="h-5 w-5" />
              <Link to="/userdashboard">Home</Link>
            </li>
            <li className="flex items-center space-x-2">
              <HiOutlineUser className="h-5 w-5" />
              <Link to="">Profile</Link>
            </li>
            <li className="flex items-center space-x-2">
              <HiBookOpen className="h-5 w-5" />
              <Link to="mybookings">Your Bookings </Link>
            </li>
            <li className="flex items-center space-x-2">
              <HiOutlineCreditCard className="h-5 w-5" />
              <Link to="mybookings">Your payments</Link>
            </li>

            <li className="flex items-center space-x-2">
              <FaCar className="h-5 w-5" />
              <Link to="mybookings">Your Bookings </Link>
            </li>
            <li className="flex items-center space-x-2">
              <IoTicket className="h-5 w-5" />
              <Link to="mybookings">Your Tickets</Link>
            </li>
            <li className="flex items-center space-x-2">
              <MdOutlineExitToApp className="h-5 w-5" />
              <Link to="homepage">Go to HomePage</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default UserNav;
