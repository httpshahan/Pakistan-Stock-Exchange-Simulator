import React from 'react';
import SideNavbar from '../NavBar/SideNavBar';
import TopNavbar from '../NavBar/TopNabar';

const MarketWatch = () => {
    return (
        <div className="flex h-screen">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          <h1>Markrt Watch</h1>
        </main>
      </div>
    </div>
    )
}

export default MarketWatch;