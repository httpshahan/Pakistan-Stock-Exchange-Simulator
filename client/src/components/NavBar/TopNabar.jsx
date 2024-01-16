import SearchBar from "./SearchBar";

function TopNavbar() {

   //get the user Name:
  const userName = localStorage.getItem("userName");
    
  return (
    <div className="flex items-center justify-between h-16 bg-gray-800 p-8">
      <div className="top-navbar-left">
      </div>
      <div className = "w-full m-10">
      <SearchBar />
      </div>
      <div className="top-navbar-right flex items-center justify-between">
        <h1 className="text-white ml-10"> {userName} </h1>
        <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
