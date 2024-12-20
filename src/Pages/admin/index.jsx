import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/products" className="block px-3 py-2 rounded hover:bg-gray-700">
            Products
          </Link>
          <Link to="/admin/add-product" className="block px-3 py-2 rounded hover:bg-gray-700">
            Create Product
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded">
            Logout
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-2">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <div className="bg-white shadow rounded p-4 h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
