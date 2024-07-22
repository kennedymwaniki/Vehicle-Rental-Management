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
import ticketsAPI from "../features/Tickets/TicketsApi";
import bookingsAPI from "../features/bookings/BookingsApi";
import paymentsAPI from "../features/Payments/PaymentsApi";
import fleetsAPI from "../features/fleet/FleetApis";
import usersAPI from "../features/Users/UserApi";
import vehiclesAPI from "../features/vehicles/VehiclesApi";
import LocationsAPI from "../features/Locations/LocationsAPI";

import { useState } from "react";
import ReportModal from "./ReportModal";

const Summary = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const { data: tickets } = ticketsAPI.useGetTicketsQuery(undefined, {
    pollingInterval: 60000,
  });
  const { data: bookings } = bookingsAPI.useGetBookingsQuery(undefined, {
    pollingInterval: 60000,
  });

  console.log(bookings);

  const { data: payments } = paymentsAPI.useGetPaymentsQuery(undefined, {
    pollingInterval: 60000,
  });

  const { data: fleets } = fleetsAPI.useGetFleetsQuery(undefined, {
    pollingInterval: 60000,
  });

  const { data: users } = usersAPI.useGetUsersQuery(undefined, {
    pollingInterval: 60000,
  });

  const { data: vehicles } = vehiclesAPI.useGetVehiclesQuery(undefined, {
    pollingInterval: 60000,
  });

  const { data: locations } = LocationsAPI.useGetLocationsQuery(undefined, {
    pollingInterval: 60000,
  });

  const pendingTicketsCount =
    tickets?.filter((ticket) => ticket.status === "open").length || 0;
  const solvedTicketsCount =
    tickets?.filter((ticket) => ticket.status === "closed").length || 0;

  const totalPayments = payments
    ?.filter((pay) => pay.paymentStatus === "Completed")
    .reduce((acc, pay) => acc + pay.amount, 0) as number;
  console.log(totalPayments);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow overflow-y-auto">
        <SummaryCard
          title="Users"
          count={users?.length || 0}
          icon={<HiOutlineUser className="h-6 w-6 text-blue-600" />}
          color="text-blue-600"
        />
        <SummaryCard
          title="Bookings"
          count={bookings?.length || 0}
          icon={<HiBookOpen className="h-6 w-6 text-green-600" />}
          color="text-green-600"
        />
        <SummaryCard
          title="Payments"
          count={payments?.length || 0}
          icon={<HiOutlineCreditCard className="h-6 w-6 text-yellow-600" />}
          color="text-yellow-600"
        />
        <SummaryCard
          title="Confirmed Payments"
          count={totalPayments}
          icon={<HiOutlineCreditCard className="h-6 w-6 text-yellow-600" />}
          color="text-yellow-600"
        />
        <SummaryCard
          title="Fleets"
          count={fleets?.length || 0}
          icon={<HiOutlineTruck className="h-6 w-6 text-purple-600" />}
          color="text-purple-600"
        />
        <SummaryCard
          title="Vehicles"
          count={vehicles?.length || 0}
          icon={<FaCar className="h-6 w-6 text-red-600" />}
          color="text-red-600"
        />
        <SummaryCard
          title="Pending Tickets"
          count={pendingTicketsCount}
          icon={<IoTicket className="h-6 w-6 text-red-600" />}
          color="text-red-600"
        />
        <SummaryCard
          title="Solved Tickets"
          count={solvedTicketsCount}
          icon={<IoTicket className="h-6 w-6 text-green-600" />}
          color="text-green-600"
        />
        <SummaryCard
          title="Locations"
          count={locations?.length || 0}
          icon={<FaMapLocationDot className="h-6 w-6 text-pink-600" />}
          color="text-pink-600"
        />
      </div>
      <div className="col-span-full flex justify-center mt-4">
        <button
          onClick={() => setIsReportModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download Report
        </button>
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          bookingsData={bookings || []}
          usersData={users || []}
        />
      </div>
    </>
  );
};

export default Summary;
