import {
    HiOutlineUser,
    HiBookOpen,
    HiOutlineCreditCard,
  } from "react-icons/hi";
  import { FaCar } from "react-icons/fa6";
  import { IoTicket ,IoHome} from "react-icons/io5";

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
            <span>Home</span>
          </li>
          <li className="flex items-center space-x-2">
            <HiOutlineUser className="h-5 w-5" />
            <span>Profile</span>
          </li>
          <li className="flex items-center space-x-2">
            <HiBookOpen className="h-5 w-5" />
            <span> Your Bookings</span>
          </li>
          <li className="flex items-center space-x-2">
            <HiOutlineCreditCard className="h-5 w-5" />
            <span>Payments</span>
          </li>
         
          <li className="flex items-center space-x-2">
            <FaCar className="h-5 w-5" />
            <span>Vehicles</span>
          </li>
          <li className="flex items-center space-x-2">
            <IoTicket className="h-5 w-5" />
            <span>Your Tickets</span>
          </li>
         
        </ul>
      </nav>
    </div>



    </>
  )
}

export default UserNav