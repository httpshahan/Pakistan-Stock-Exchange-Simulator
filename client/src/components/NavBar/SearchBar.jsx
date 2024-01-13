function SearchBar() {
  return (
    <div class="search-bar flex items-center">
    <input
        type="text"
        class="p-3 pl-10 pr-4 rounded-full border border-gray-700 focus:outline-none focus:border-blue-500 w-64"
        placeholder="Search"
    />
</div>
  );
}
export default SearchBar;