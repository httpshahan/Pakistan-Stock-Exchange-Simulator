import React, { useState } from "react";
import TopNavBar from "./TopNav";
import UserManagement from "./UserManag";
import TransactionHistory from "./Transaction";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";

const AdminDash = () => {
  // Example data for user accounts and invested money

  // Example data for trading data

  // Notification state
  const [notification, setNotification] = useState("");

  // Function to handle adding notifications
  const handleAddNotification = () => {
    // Logic to add notification (you can implement as needed)
    console.log("Notification added:", notification);
    // Clear the input field after adding the notification
    setNotification("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between">
          <h1 className="text-3xl font-bold p-6">Admin Dashboard</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg m-6">
            Logout
          </button>
        </header>

        <main className="flex-1 p-6 justify-center">
          <TabGroup>
            <TabList>
              <Tab>Users</Tab>
              <Tab>Transactions</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <UserManagement />
              </TabPanel>
              <TabPanel>
                <TransactionHistory />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </main>
        <footer className="bg-white py-4 px-6 border-t">
          <p className="text-sm text-gray-600">
            © 2024 Stock Exchange Simulator
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AdminDash;
