import TopNavbar from "./NavBar/TopNabar";
import SideNavbar from "./NavBar/SideNavBar";
function Dashboard() {
  const userName = localStorage.getItem("userName");
  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
