import React from 'react'
import SideNavbar from '../NavBar/SideNavBar'
import TopNavbar from '../NavBar/TopNabar'
import {Metric} from "@tremor/react";

const Watchlist = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <div className="flex-1 overflow-auto">
            <div className="p-8">
                <div className="flex flex-col">
                <Metric className="text-center">Watchlist</Metric>
                </div>
                
            </div>
        </div>
        </div>
    </div>
  )
}

export default Watchlist