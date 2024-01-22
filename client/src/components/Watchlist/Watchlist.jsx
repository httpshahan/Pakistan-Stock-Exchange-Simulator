import React from 'react'
import SideNavbar from '../NavBar/SideNavBar'
import TopNavbar from '../NavBar/TopNabar'

const Watchlist = () => {
  return (
    <div className="flex h-full">
      <SideNavbar />
      <div className="flex flex-col flex-1">
        <TopNavbar />
        <h1>Watchlist</h1>
      </div>
    </div>
  )
}

export default Watchlist;