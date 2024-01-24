import React, { useEffect, useState } from "react";
import TopNavbar from "./NavBar/TopNabar";
import SideNavbar from "./NavBar/SideNavBar";
import apiService from "../services/apiService";

function Dashboard() {
  const userName = localStorage.getItem("userName");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate a delay or wait for the scraping process to complete
        const scrape = await apiService.get("/delay");
        console.log(scrape.data);
        console.log("Scraping Complete");
        // Set loading to false after scraping process completes
        setLoading(false);
      } catch (error) {
        console.error("Error running Scraper:", error);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once on component mount

  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <div className="flex-1 overflow-auto">
          {loading ? (
            // Display loader while loading is true
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full border-t-4 border-black border-opacity-25 h-12 w-12"></div>
            </div>
          ) : (
            // Display dashboard content once loading is false
            <div className="p-8">
              <div className="flex flex-col">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                {/* Other dashboard content goes here */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
