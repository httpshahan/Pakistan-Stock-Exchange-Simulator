import SearchBar from "./SearchBar";

function TopNavbar(){
    return(
        <div className="top-navbar">
            <div className="top-navbar-left">
                <h1>Logo</h1>
            </div>
            <div className="top-navbar-right">
                <SearchBar />
                <h1>Profile</h1>
            </div>
        </div>
    );
}

export default TopNavbar;