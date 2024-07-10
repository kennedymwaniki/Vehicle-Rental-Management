// import Fleets from "./features/fleet/Fleets";
// import Payments from "./features/Payments/Payments";
// import TicketList from "./features/Tickets/TicketList";
// import Users from "./features/Users/Users";
// import Vehicles from "./features/vehicles/Vehicles";

import Homepage from "./Pages/Homepage";

// import AdminDashboard from "./Pages/AdminDashboard";
Homepage;

{
  /* <Users />
      <Payments />
      <Vehicles />
      <Fleets />
      <TicketList />
      <AdminDashboard /> */
}
const App = () => {
  return (
    <div className="text-black flex flex-col gap-4">
      <Homepage />
    </div>
  );
};

export default App;
