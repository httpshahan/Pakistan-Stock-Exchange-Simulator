import React from 'react'
import SideNavbar from '../NavBar/SideNavBar'
import TopNavbar from '../NavBar/TopNabar'

const Trade = () => {
  return (
    <div className="flex h-full">
      <SideNavbar />
      <div className="flex flex-col flex-1">
        <TopNavbar />
        <h1>Trade</h1>
      </div>
      </div>
  )
}

export default Trade;