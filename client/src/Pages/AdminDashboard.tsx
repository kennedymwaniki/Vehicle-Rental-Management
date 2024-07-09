import Dashboard from "../ui/DashBoard";
import SideBar from "../ui/SideBar";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-grow overflow-y-auto">
        <Dashboard />
      </div>
    </div>
  );
};

export default AdminDashboard;
