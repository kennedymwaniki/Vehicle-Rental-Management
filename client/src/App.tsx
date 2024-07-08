import Fleets from "./features/fleet/Fleets";
import Payments from "./features/Payments/Payments";
import TicketList from "./features/Tickets/TicketList";
import Users from "./features/Users/Users";
import Vehicles from "./features/vehicles/Vehicles";

const App = () => {
  return (
    <div className="text-black flex flex-col gap-4">
      <Users />
      <Payments />
      <Vehicles />
      <Fleets />
      <TicketList />
    </div>
  );
};

export default App;
