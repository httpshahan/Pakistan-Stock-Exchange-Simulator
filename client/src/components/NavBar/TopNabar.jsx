import SearchBar from "./SearchBar";

function TopNavbar() {

   //get the user Name:
  const userName = localStorage.getItem("userName");
    
  return (
    <div class="flex items-center justify-between h-16 bg-gray-800 p-8">
      <div class="top-navbar-left">
      </div>
      <div class="top-navbar-right flex items-center">
        <SearchBar />
        <h1 class="text-white ml-4"> {userName} </h1>
        <button class="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
            window.location.href = "/";
          }}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default TopNavbar;
