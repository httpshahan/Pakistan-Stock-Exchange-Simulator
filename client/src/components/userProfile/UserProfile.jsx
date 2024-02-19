import React, { useState } from "react";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";

const UserProfile = () => {
  const userName = sessionStorage.getItem("username");
  const userEmail = sessionStorage.getItem("email");

  const [username, setUsername] = useState("JohnDoe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [nameEditMode, setNameEditMode] = useState(false);
  const [name, setName] = useState("John Doe");
  const [password, setPassword] = useState("");
  const [addMoneyAmount, setAddMoneyAmount] = useState("");

  const handleNameEdit = () => {
    setNameEditMode(true);
  };

  const handleSaveName = () => {
    // Save name logic here
    setNameEditMode(false);
  };

  const handleAddMoney = () => {
    // Add money logic here
    console.log("Added money:", addMoneyAmount);
    setAddMoneyAmount("");
  };
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <div className="flex-1 overflow-auto bg-stock-light">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium">Account</h3>
            <p className="mt-1 text-gray-500">
              {" "}
              Manage your account settings.{" "}
            </p>
          </div>
          <div className="flex gap-3 p-2">
            <div className="flex flex-col items-center p-6 w-1/2 bg-white rounded shadow-md">
              <div className="w-full">
                <h4 className="text-xl font-medium text-gray-700">Full Name</h4>
                <div className="my-1 border-t-2 border-gray-200"></div>
                <div className="p-4">
                  <p className="text-gray-600">{userName}</p>
                </div>
              </div>
              <div className="w-full mt-6">
                <h4 className="text-xl font-medium text-gray-700">
                  Email Address
                </h4>
                <div className="my-1 border-t-2 border-gray-200"></div>
                <div className="p-4">
                  <p className="text-gray-600">{userEmail}</p>
                </div>
              </div>
            </div>
            <div className="w-1/2 p-6 bg-white rounded shadow-md">
              <h4 className="text-xl font-medium text-gray-700">
                Password Reset
              </h4>
              <div className="my-1 border-t-2 border-gray-200"></div>
              <div className="p-4">
                <form className="w-full max-w-sm flex flex-col gap-4">
                  <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
                    <input
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      placeholder="Old Password"
                      aria-label="Full name"
                    />
                  </div>
                  <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
                    <input
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      placeholder="New Password"
                      aria-label="Full name"
                    />
                  </div>
                  <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
                    <input
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      placeholder="Confirm New Password"
                      aria-label="Full name"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
