import TopNavbar from "./NavBar/TopNabar";
import SideNavbar from "./NavBar/SideNavBar";
function Dashboard() {
  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          <h1>Dashoard</h1>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;