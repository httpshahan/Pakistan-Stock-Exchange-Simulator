import React, { useState } from "react";

import UserManagement from "./UserManag";
import TransactionHistory from "./Transaction";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";

const AdminDash = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between">
          <h1 className="text-3xl font-bold p-6">Admin Dashboard</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg m-6">
            Logout
          </button>
        </header>
        <main className="flex-1 p-6 justify-center overflow-hidden">
          <TabGroup>
            <TabList>
              <Tab>Users</Tab>
              <Tab>Transactions</Tab>
            </TabList>
            <TabPanels className="overflow-x-auto">
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
