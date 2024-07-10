import logo from "../assets/kenny blue-Photoroom.png";

const Navbar = () => {
  return (
    <div className="flex justify-between">
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
        <button className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600">
          Login
        </button>
        <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600">
          Register
        </button>
      </div>
    </div>
  );
};

export default Navbar;
