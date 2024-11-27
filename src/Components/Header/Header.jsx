import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a
          href="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="text-[32px] font-extrabold leading-[38.4px]">
            Bulut
          </span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-900">On Sale</a>
          <a className="mr-5 hover:text-gray-900">New Arrivals</a>
          <input
            className="bg-slate-200 p-1 rounded"
            placeholder="type"
            type="text"
            size="40"
            name="one-line"
          />
        </nav>

        <div className="inline-flex gap-3 items-center border-0 py-1 px-3 rounded text-base mt-4 md:mt-0">
          <Link to="/pay">
            <AiOutlineShoppingCart />
          </Link>
          <AiOutlineUser />
        </div>
      </div>
    </header>
  );
};
export default Header;
