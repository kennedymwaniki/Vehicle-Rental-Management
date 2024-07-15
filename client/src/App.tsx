import BookingsTable from "./features/bookings/BookingsTable";
import Login from "./features/Login/Login";
import RegisterComponent from "./features/Login/Register";
import Payments from "./features/Payments/Payments";
import Users from "./features/Users/Users";
import AdminDashboard from "./Pages/AdminDashboard";
import Error from "./Pages/Error";
import Homepage from "./Pages/Homepage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserDashboard from "./Pages/UserDashboard";
import Vehicles from "./features/vehicles/Vehicles";
import Summary from "./ui/Summary";
import Fleets from "./features/fleet/Fleets";
import UserBookings from "./features/Users/UserBookings";
import BookingSuccess from "./components/BookingSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "*",
    element: <Error />
  },
  {
    path: "register",
    element: <RegisterComponent />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "booking-success",
    element: <BookingSuccess />,
  },
  {
    path: "userdashboard",
    element: <UserDashboard />,
    children:[
      {
        path: 'mybookings',
        element: <UserBookings/>
      }
    ]
  },
  {
    path: "admindashboard",
    element: <AdminDashboard />,
    children: [
      {
        index: true,
        element: <Summary />,
      },
      {
        path: "bookings",
        element: <BookingsTable />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "payments",
        element: <Payments />,
      },
      {
        path: "vehicles",
        element: <Vehicles />,
      },
      {
        path: "fleets",
        element: <Fleets />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
