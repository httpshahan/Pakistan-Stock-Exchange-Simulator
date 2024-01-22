import React from "react";

function SearchBar() {
  return (
    <div className="flex items-center justify-center w-full px-2 py-4 mx-auto bg-white rounded-md  md:w-3/4 lg:w-1/2">
      <div className="relative">
        <input
          type="text"
          className="w-64 h-10 px-4 pr-16 text-sm text-gray-900 placeholder-gray-500 bg-[#F7F6F9] border border-transparent rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          placeholder="Stocks....."
        />
        <button className="absolute w-5 h-5 text-gray-400 top-3 right-3 dark:text-gray-300">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="m13.707 12.293-1.414 1.414-4.293-4.293 1.414-1.414 4.293 4.293Zm-1.414-2.586 1.414-1.414 4.293 4.293-1.414 1.414-4.293-4.293Z"
            />
          </svg>
        </button>
      </div>
    </div>

    // <form>
    //   <label
    //     htmlFor="default-search"
    //     className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
    //   >
    //     Search
    //   </label>
    //   <div className="relative">
    //     <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
    //       <svg
    //         className="w-4 h-4 text-gray-500 dark:text-gray-400"
    //         aria-hidden="true"
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 20 20"
    //       >
    //         <path
    //           stroke="currentColor"
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           strokeWidth={2}
    //           d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
    //         />
    //       </svg>
    //     </div>
    //     <input
    //       type="search"
    //       id="default-search"
    //       className="block w-full h-10 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       placeholder="Stocks....."
    //       required
    //     />
    //   </div>
    // </form>
  );
}
export default SearchBar;
