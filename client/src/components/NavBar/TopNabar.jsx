import SearchBar from "./SearchBar";

function TopNavbar() {
  return (
    <div class="flex items-center justify-between h-16 bg-gray-800 p-8">
      <div class="top-navbar-left">
        
      </div>
      <div class="top-navbar-right flex items-center">
        <SearchBar />
        <h1 class="text-white ml-4">Profile</h1>
      </div>
    </div>
  );
}

export default TopNavbar;
