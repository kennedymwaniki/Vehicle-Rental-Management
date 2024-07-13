import BookingsTable from "./features/bookings/BookingsTable";
import Login from "./features/Login/Login";
import RegisterComponent from "./features/Login/Register";
import Payments from "./features/Payments/Payments";
import Users from "./features/Users/Users";
import AdminDashboard from "./Pages/AdminDashboard";
import Homepage from "./Pages/Homepage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
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
    path: "admindashboard",
    element: <AdminDashboard />,
    children: [
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
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
