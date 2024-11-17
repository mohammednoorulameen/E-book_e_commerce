import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaEllipsisV,
  FaBook,
  FaSignOutAlt,
  FaClipboardList,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation,useGetUserProfileQuery } from '../../Services/Apis/UserApi'
import { useDispatch, useSelector } from "react-redux";
import { clearUser,setUser } from '../../Redux/Slice/UserSlice/UserSlice'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("HOME");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate  = useNavigate()
  const [logout] = useLogoutMutation();
  const {data:profile} = useGetUserProfileQuery()
  const userProfile = profile?.userProfile
  
  /**
   * setting user data 
   */

  useEffect(()=>{
    if (userProfile) {
      dispatch(setUser(userProfile))
    }
  },[dispatch,userProfile])
  
  const userData=useSelector(state=>state.user.userProfile)


  /**
   * handling tab change
   */

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  /**
   * handle logout 
   */

  const HandleLogout = async () =>{
    await logout()
    localStorage.removeItem('userToken');
    dispatch(clearUser())
    navigate('/') 
  }
  return (
    <header>
      {/* Top Bar */}
      <div className="py-4 px-5 bg-white  fixed top-0 w-full z-40">
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
          <div className="flex items-center gap-11 text-lg ml-auto">
            {/* Login with Dropdown */}
            <div className="relative">
              { userData ? (
                <button
                onClick={toggleDropdown}
                className="flex items-center gap-1 text-gray-800 group focus:outline-none"
              >
                <FaUser />
                <span className="text-black">Account</span>
              </button>
              ):(
                <button
                onClick={toggleDropdown}
                className="flex items-center gap-1 text-gray-800 group focus:outline-none"
              >
                <FaUser />
                <span className="text-black">Login</span>
              </button>
              )}
              {isDropdownOpen && (
                <div className="absolute text-sm right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                  {userData ? (
                    <Link
                    to="/account"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <FaUser />
                    <span>My Profile</span>
                  </Link>
                  ):(

                   <Link
                   to="/login"
                   className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                 >
                   <FaUser />
                   <span>Login</span>
                 </Link>
                  )}
                  


                  <Link
                    to="/wishlist"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <FaHeart />
                    <span>Wishlist</span>
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <FaClipboardList />
                    <span>Orders</span>
                  </Link>
                 { userData && <Link
                    onClick={HandleLogout}
                    className="flex text-red-500 items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <FaSignOutAlt />
                    <span >Logout</span>
                  </Link>}
                </div>
              )}
            </div>

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
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-white px-5 fixed top-16 w-full z-30"> {/* Adjusted margin-top */}
        <div className="max-w-screen-xl mx-auto flex justify-center gap-4">
          {[
            { label: "HOME", path: "/" },
            { label: "SHOP", path: "/shop" },
            { label: "CATEGORIES", path: "/categories" },
            { label: "AUTHORS", path: "/authors" },
            { label: "CONTACT", path: "/contact" },
            { label: "ABOUT US", path: "/about" },
          ].map((tab) => (
            <Link
              key={tab.label}
              to={tab.path}
              onClick={() => handleTabChange(tab.label)}
              className={`text-black text-sm font-medium px-5 py-3 ${
                activeTab === tab.label ? "border-b-2 border-yellow-500" : ""
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
