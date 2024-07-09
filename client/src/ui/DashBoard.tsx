import {
  HiOutlineUser,
  HiBookOpen,
  HiOutlineCreditCard,
  HiOutlineTruck,
} from "react-icons/hi";
import { FaCar } from "react-icons/fa6";
import { IoTicket } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";

import SummaryCard from "./SummaryCard";
import ProfileMenu from "./ProfileMenu";

const Dashboard = () => {
  return (
    <div className="flex flex-col flex-grow p-6 bg-gray-100 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Welcome Kennedy</h2>
        <ProfileMenu />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow overflow-y-auto">
        <SummaryCard
          title="Users"
          count={120}
          icon={<HiOutlineUser className="h-6 w-6 text-blue-600" />}
          color="text-blue-600"
        />
        <SummaryCard
          title="Bookings"
          count={75}
          icon={<HiBookOpen className="h-6 w-6 text-green-600" />}
          color="text-green-600"
        />
        <SummaryCard
          title="Payments"
          count={320}
          icon={<HiOutlineCreditCard className="h-6 w-6 text-yellow-600" />}
          color="text-yellow-600"
        />
        <SummaryCard
          title="Fleets"
          count={5}
          icon={<HiOutlineTruck className="h-6 w-6 text-purple-600" />}
          color="text-purple-600"
        />
        <SummaryCard
          title="Vehicles"
          count={15}
          icon={<FaCar className="h-6 w-6 text-red-600" />}
          color="text-red-600"
        />
        <SummaryCard
          title="Pending Tickets"
          count={8}
          icon={<IoTicket className="h-6 w-6 text-red-600" />}
          color="text-red-600"
        />
        <SummaryCard
          title="Solved Tickets"
          count={20}
          icon={<IoTicket className="h-6 w-6 text-green-600" />}
          color="text-green-600"
        />
        <SummaryCard
          title="Locations"
          count={10}
          icon={<FaMapLocationDot className="h-6 w-6 text-pink-600" />}
          color="text-pink-600"
        />
      </div>
    </div>
  );
};

export default Dashboard;
