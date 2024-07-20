import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../app/store";

const ProfileMenu = ({ fullName }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user);

  const hasImage = Boolean(user?.user.image);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="flex items-center space-x-2">
        <img
          src={hasImage ? user?.user.image : "https://via.placeholder.com/100"}
          alt="Profile"
          className="h-8 w-8 rounded-full"
        />
        <span className="font-medium">{fullName}</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
          {user?.user.role === "admin" ? (
            <a
              href="/admindashboard"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Admin Dashboard
            </a>
          ) : (
            <a
              href="/userdashboard"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              User Dashboard
            </a>
          )}

          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
