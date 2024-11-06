import React, { useState } from "react";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaEllipsisV,
  FaBook,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const NavLink = ({ children, active }) => (
  <a
    href="#"
    className={`text-white text-sm font-medium px-5 py-3 ${
      active ? "border-b-2 border-yellow-500" : ""
    }`}
  >
    {children}
  </a>
);

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <header>
      {/* Top Bar */}
      <div className="py-4 px-5 bg-white border-b border-gray-200 fixed top-0 w-full top- z-50">
        {" "}
        {/* Top bar sticky */}
        <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-5">
          {/* Logo */}
          <div className="flex items-center gap-2 text-2xl font-bold text-black">
            <FaBook />
            <span>E-book</span>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-4 pr-12 border border-gray-300 rounded-full text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-2"
            >
              <FaSearch />
            </button>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-11 text-lg ml-auto ">
            <Link
              to="/login"
              className="flex items-center gap-1 text-gray-800 group"
            >
              <FaUser />
              <span className="text-black">Login</span>
              <span className="absolute top-full mt-1 hidden group-hover:flex bg-black text-white rounded px-2 py-1 text-xs">
                My Profile
              </span>
            </Link>
            <a href="#" className="flex items-center gap-1 text-gray-800">
              <FaShoppingCart />
              <span>Cart</span>
            </a>
            <a href="#" className="flex items-center gap-1 text-gray-800">
              <FaHeart />
              <span>Wishlist</span>
            </a>
            <a href="#" className="flex items-center gap-1 text-gray-800">
              <FaEllipsisV />
              <span></span>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-black px-5 fixed mt-14 w-full z-50">
        <div className="max-w-screen-xl mx-auto flex justify-center gap-4">
          <NavLink active>HOME</NavLink>
          <NavLink>SHOP</NavLink>
          <NavLink>CATEGORIES</NavLink>
          <NavLink>AUTHORS</NavLink>
          <NavLink>CONTACT</NavLink>
          <NavLink>ABOUT US</NavLink>
        </div>
      </nav>
    </header>
  );
}
