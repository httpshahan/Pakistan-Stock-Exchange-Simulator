import React from 'react'
import SideNavbar from '../NavBar/SideNavBar'
import TopNavbar from '../NavBar/TopNabar'

const Watchlist = () => {
  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="flex flex-col flex-1">
        <TopNavbar />
        <div className="flex-1 overflow-auto">
            <div className="p-8">
                <div className="flex flex-col">
                <h1 className="text-2xl font-semibold">Watchlist</h1>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Watchlist