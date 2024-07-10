import {
  HiOutlineUser,
  HiBookOpen,
  HiOutlineCreditCard,
  HiOutlineTruck,
} from "react-icons/hi";
import { FaCar } from "react-icons/fa6";
import { IoTicket } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
// import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="flex flex-col h-full bg-blue-600 p-4 text-white">
      <nav className="flex flex-col h-full">
        <div className="mb-8">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <ul className="space-y-4">
          <li className="flex items-center space-x-2">
            <HiOutlineUser className="h-5 w-5" />
            <span>Users</span>
          </li>
          <li className="flex items-center space-x-2">
            <HiBookOpen className="h-5 w-5" />
            <span>Bookings</span>
          </li>
          <li className="flex items-center space-x-2">
            <HiOutlineCreditCard className="h-5 w-5" />
            <span>Payments</span>
          </li>
          <li className="flex items-center space-x-2">
            <HiOutlineTruck className="h-5 w-5" />
            <span>Fleets</span>
          </li>
          <li className="flex items-center space-x-2">
            <FaCar className="h-5 w-5" />
            <span>Vehicles</span>
          </li>
          <li className="flex items-center space-x-2">
            <IoTicket className="h-5 w-5" />
            <span>Customer Tickets</span>
          </li>
          <li className="flex items-center space-x-2">
            <FaMapLocationDot className="h-5 w-5" />
            <span>Locations</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;