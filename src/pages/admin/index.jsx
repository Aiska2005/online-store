import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function AdminPanel() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  
  const toggleSidebarWidth = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`${
          isSidebarExpanded ? "min-w-52" : "w-20"
        } bg-gray-800 text-white flex flex-col transition-all duration-300`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          <span className="text-2xl font-bold">
            {isSidebarExpanded ? "Admin" : "AP"}
          </span>
          <button
            onClick={toggleSidebarWidth}
            className="text-gray-400 hover:text-white"
          >
            {isSidebarExpanded ? "<" : ">"}
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin/products"
            className="flex items-center px-3 py-2 rounded hover:bg-gray-700"
          >
            {isSidebarExpanded && <span className="ml-3">Products</span>}
          </Link>
          <Link
            to="/admin/add-product"
            className="flex items-center px-3 py-2 rounded hover:bg-gray-700"
          >
            {isSidebarExpanded && <span className="ml-3">Create Product</span>}
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded">
            {isSidebarExpanded ? "Logout" : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                <path fillRule="evenodd"
                      d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z"
                      clipRule="evenodd"/>
                <path fillRule="evenodd"
                      d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z"
                      clipRule="evenodd"/>
              </svg>
            )}
          
          </button>
        </div>
      </aside>
      
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <div className="bg-white shadow rounded p-4 h-full">
          <Outlet/>
        </div>
      </main>
    </div>
  );
}
