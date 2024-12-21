import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";

const Header = () => {
  return (
    <header className="text-gray-600 body-font border-b border-gray-200">
      <div className="container mx-auto flex flex-wrap p-5 flex-row items-center justify-between">
        <a
          className="flex title-font font-medium items-center text-gray-900"
          href="/"
        >
          {/*<img className="w-[160px]" src="/logo.svg" alt="Logo" />*/}
          <span className="text-xl">BULUT</span>
        </a>

        <div className="flex items-center gap-6 flex-grow max-w-3xl">
          <nav className="hidden md:flex gap-6">
            <a className="hover:text-gray-900">В продаже</a>
            <a className="hover:text-gray-900">Новые поступления</a>
          </nav>
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-md w-full md:max-w-md">
            <IoSearchOutline className="h-5 w-5 text-gray-400" />
            <input
              className="bg-transparent focus:outline-none px-4 flex-grow text-gray-800 placeholder-gray-500"
              placeholder="Поиск товара..."
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <a href="/cart" className="relative">
            <AiOutlineShoppingCart className="h-6 w-6" />
            <span className="absolute -top-1 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </a>
          <AiOutlineUser className="h-6 w-6" />
        </div>
      </div>
    </header>
  );
};

export default Header;
