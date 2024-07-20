import {
  HiBookOpen,
  HiOutlineCreditCard,
  // HiOutlineTruck,
} from "react-icons/hi";
// import { FaCar } from "react-icons/fa6";
import { IoTicket } from "react-icons/io5";
// import { FaMapLocationDot } from "react-icons/fa6";

import SummaryCard from "./SummaryCard";

const UserSummary = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow overflow-y-auto">
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
      </div>
    </div>
  );
};

export default UserSummary;
