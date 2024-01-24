import React, { useState } from "react";
import SearchBar from "./SearchBar";

function TopNavbar() {
  const userName = sessionStorage.getItem("username");

  return (
    <div className="flex items-center bg-white h-20 p-8 shadow-md">
      <div className="w-full">
        <p className="text-[#2C2C2C] text-xl font-medium">Hello, {userName}</p>
      </div>
      <div className="flex items-center justify-between gap-5">
        <div className="w-full">
          <SearchBar />
        </div>
        <div className="flex items-center">
          <div className="relative w-auto">Profile</div>
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;
