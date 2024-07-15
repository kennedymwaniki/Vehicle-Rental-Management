import UserDash from "../ui/UserDash"
import UserNav from "../ui/UserNav"

UserNav
const UserDashboard = () => {
  return (
    <div className="flex h-screen">
      <UserNav/>
      <div className="flex-grow overflow-y-auto">
        <UserDash/>
      </div>
    </div>
  )
}

export default UserDashboard
