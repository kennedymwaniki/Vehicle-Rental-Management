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
import ProtectedRoute from "./components/ProtectedRoute";
import Cars from "./components/Cars";
import Booking from "./components/BookingComponent";
import UserTickets from "./features/Users/UserTickets";
import UserProfile from "./features/Users/UserProfile";
import TicketList from "./features/Tickets/TicketList";
import UserSummary from "./ui/UserSummary";
import AdminProfile from "./Pages/AdminProfile";
import LocationsTable from "./features/Locations/LocationsTable";
import Footer from "./components/Footer";
import About from "./components/About";
import AdminLogin from "./features/Login/AdminLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "*",
    element: <Error />,
  },
  {
    path: "register",
    element: <RegisterComponent />,
  },
  {
    path: "adminlogin",
    element: <AdminLogin />,
  },
  {
    path: "cars",
    element: <Cars />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "footer",
    element: <Footer />,
  },
  {
    path: "booking-success",
    element: <BookingSuccess />,
  },
  //! wrap everything in a protected route and the usersdashboard becomes a child of the protected route and so does the admin page

  {
    path: "userdashboard",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <UserDashboard />,
        children: [
          {
            index: true,
            element: <UserSummary />,
          },
          {
            path: "mybookings",
            element: <UserBookings />,
          },
          {
            path: "myTickets",
            element: <UserTickets />,
          },
          {
            path: "myprofile",
            element: <UserProfile />,
          },
        ],
      },
    ],
  },
  {
    path: "admindashboard",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
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
          {
            path: "tickets",
            element: <TicketList />,
          },
          {
            path: "adminprofile",
            element: <AdminProfile />,
          },
          {
            path: "locations",
            element: <LocationsTable />,
          },
        ],
      },
    ],
  },
  {
    path: "booking/:vehicleId",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Booking />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
