import React, { useEffect, useState } from "react";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";
import apiService from "../../services/apiService";
import StockTable from "./StockTable";
import { Card, Grid, Metric, Text } from "@tremor/react";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [topAdvancers, setTopAdvancers] = useState([]);
  const [topDecliners, setTopDecliners] = useState([]);
  const balence = sessionStorage.getItem("balance");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate a delay or wait for the scraping process to complete
        const scrape = await apiService.get("/delay");
        console.log(scrape.data);
        console.log("Scraping Complete");

        // Fetch data for Top Advancers
        const topAdvancersResponse = await apiService.get("/stocks/topStocks");
        setTopAdvancers(topAdvancersResponse.data.data);

        // Fetch data for Top Decliners
        const topDeclinersResponse = await apiService.get(
          "/stocks/declinerStocks"
        );
        setTopDecliners(topDeclinersResponse.data.data);

        // Set loading to false after scraping and fetching processes complete
        setLoading(false);
      } catch (error) {
        console.error("Error running Scraper or fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once on component mount

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <div className="flex-1 overflow-auto p-8">
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full border-t-4 border-green-500 border-solid h-12 w-12"></div>
              <div className="ml-3 text-xl font-semibold text-green-500">
                Loading...
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-8">
              <div className="text-3xl font-semibold mb-4">
                Dashboard Overview
              </div>

              <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
                <Card>
                  <Text>Portfolio Value</Text>
                  <Metric>0000000</Metric>
                </Card>
                <Card>
                  <Text>Invested Amount</Text>
                  <Metric>0000000</Metric>
                </Card>
                <Card>
                  <Text>Growth</Text>
                  <Metric>0000000</Metric>
                </Card>
                <Card>
                  <Text>Cash</Text>
                  <Metric>{balence}</Metric>
                </Card>
              </Grid>

              

              <div className="flex gap-4 mt-8">
                <StockTable title="Top Advancers" data={topAdvancers} />
                <StockTable title="Top Decliners" data={topDecliners} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
