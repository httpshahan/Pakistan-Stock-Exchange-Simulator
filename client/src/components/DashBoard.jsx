import TopNavbar from "./NavBar/TopNabar";
import SideNavbar from "./NavBar/SideNavBar";
function Dashboard() {
  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <h1 className="text-2xl font-semibold m-4">Dashboard</h1>
      </div>
    </div>
    
  );
}

export default Dashboard;
