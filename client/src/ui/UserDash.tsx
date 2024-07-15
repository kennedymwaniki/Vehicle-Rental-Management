import ProfileMenu from "./ProfileMenu"
import { Outlet } from "react-router-dom";



const UserDash = () => {
  return (
    <div className="flex flex-col flex-grow p-6 bg-gray-100 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Welcome Kennedy</h2>
        <ProfileMenu />
      </div>
      <div className="flex-grow overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default UserDash