import {
  HiOutlineUser,
  HiBookOpen,
  HiOutlineCreditCard,
  HiOutlineTruck,
} from "react-icons/hi";
import { FaCar } from "react-icons/fa6";
import { IoTicket, IoHome } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaTachometerAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineExitToApp } from "react-icons/md";
import { toast, Toaster } from "sonner";

import { useDispatch } from "react-redux";
import { clearCredentials } from "../features/Auth/authSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Logout = () => {
    console.log("clicked");
    dispatch(clearCredentials());
    toast.success("You have been logged out");
    navigate("/login");
  };
  return (
    <div className="flex flex-col h-full bg-blue-600 p-2 text-white">
      <Toaster position="top-center" richColors />

      <nav className="flex flex-col h-full">
        <div className="mb-8 flex items-center space-x-2">
          <FaTachometerAlt className="h-6 w-6" />
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <ul className="space-y-4">
          <li className="flex items-center space-x-2">
            <IoHome className="h-5 w-5" />
            <Link to="/admindashboard">Home</Link>
          </li>
          <li className="flex items-center space-x-2">
            <HiOutlineUser className="h-5 w-5" />
            <Link to="/admindashboard/users">Users</Link>
          </li>
          <li className="flex items-center space-x-2">
            <HiBookOpen className="h-5 w-5" />
            <Link to="bookings">Bookings</Link>
          </li>
          <li className="flex items-center space-x-2">
            <HiOutlineCreditCard className="h-5 w-5" />
            <Link to="/admindashboard/payments">Payments</Link>
          </li>
          <li className="flex items-center space-x-2">
            <HiOutlineTruck className="h-5 w-5" />
            <Link to="fleets">Fleets</Link>
          </li>
          <li className="flex items-center space-x-2">
            <FaCar className="h-5 w-5" />
            <Link to="vehicles">Vehicles</Link>
          </li>
          <li className="flex items-center space-x-2">
            <IoTicket className="h-5 w-5" />
            <Link to="tickets">Customer Tickets</Link>
          </li>
          <li className="flex items-center space-x-2">
            <FaMapLocationDot className="h-5 w-5" />
            <Link to="locations">Locations</Link>
          </li>
        </ul>
      </nav>
      <button className="mb-[125px] flex" onClick={Logout}>
        <MdOutlineExitToApp className="h-6 w-6" />
        <p>Logout</p>
      </button>
    </div>
  );
};

export default SideBar;
