import ProfileMenu from "./ProfileMenu";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const UserDash = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const fullName = user?.user.fullName as string;
  return (
    <div className="flex flex-col flex-grow p-6 bg-gray-100 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Welcome {fullName}</h2>
        <ProfileMenu fullName={fullName} />
      </div>
      <div className="flex-grow overflow-y-auto ">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDash;
