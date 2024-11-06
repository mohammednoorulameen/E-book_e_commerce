import React from "react";
import {
  FaUsers,
  FaChartLine,
  FaThLarge,
  FaShoppingCart,
  FaList,
  FaCalendar,
  FaPercent,
  FaDesktop,
  FaCreditCard,
  FaBook,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const sidebarItems = [
  { name: "Dashboard", icon: FaThLarge, path: "/admin/dashboard" },
  { name: "Products", icon: FaList, path: "/admin/products" },
  { name: "Users", icon: FaUsers, path: "/admin/users" },
  { name: "Categories", icon: FaCalendar, path: "/admin/category" },
  { name: "Orders", icon: FaShoppingCart, path: "/" },
  { name: "Coupons", icon: FaPercent, path: "/" },
  { name: "Banners", icon: FaDesktop, path: "/" },
  { name: "Payments", icon: FaCreditCard, path: "/" },
  { name: "Offers", icon: FaChartLine, path: "/" },
];

const AdminSidebar = ({ sidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePath = (path) => {
    navigate(path);
  };

  return (
    <aside
      className={`${
        sidebarOpen ? "w-60" : "w-0"
      } bg-white min-h-screen shadow-md transition-all duration-300 ease-in-out  overflow-hidden`}
    >
      <h3
        className="flex items-center justify-center mt-5"
        style={{ fontSize: "24px", fontWeight: "bold" }}
      >
        <FaBook className="ml-4 text-black" /> <span>E-book</span>
      </h3>
      <List>
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;
          return (
            <ListItem
              // button
              onClick={() => handlePath(item.path)}
              key={item.name}
              className="hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
            >
              <ListItemIcon className="ml-5">
                <IconComponent className={`w-5 h-5 ${isActive ? "text-gray-400" : "text-black"}`} />
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                className={isActive ? "text-gray-400" : "text-black"}
              />
            </ListItem>
          );
        })}
      </List>
    </aside>
  );
};

export default AdminSidebar;
