import { Link } from "react-router-dom";
import logo from "../assets/kenny blue-Photoroom.png";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import ProfileMenu from "./ProfileMenu";
Link;
const Navbar = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const fullName = user?.user.fullName;
  console.log(user);
  return (
    <div className="flex justify-between bg-white">
      <div className="logo">
        <img src={logo} alt="" className="p-0 m-0 h-[80px]" />
      </div>
      <div className="m-8">
        <nav>
          <ul className="flex justify-between gap-5">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Vehicles</li>
            <li>Contact us</li>
          </ul>
        </nav>
      </div>

      <div className="m-8">
        {!isAuthenticated ? (
          <>
            <button className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600">
              <Link to="login">Login</Link>
            </button>
            <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600">
              <Link to="register">Register</Link>
            </button>
          </>
        ) : (
          <ProfileMenu fullName={fullName} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
