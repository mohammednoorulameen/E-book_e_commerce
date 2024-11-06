import React, { useState } from "react";
import AdminSidebar from "../../Common/AdminSidebar";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../Common/AdminNavbar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (

    <div className="min-h-screen bg-gray-50 flex">
      {/* admin sidebar */}
      <div className="">
      <AdminSidebar  sidebarOpen={sidebarOpen} /> 
      </div>
      <div className="flex-1">
        {/* admin navbar */}
        <AdminNavbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        {/*  <div className="flex-1 flex flex-col overflow hidden"> */}
        <div className="flex-1 ">
          {/* <div className="flex-1 overflow-y-auto p-10 bg-gray-800"> */}
          <Outlet />
        </div>
      </div>
      {" "}
    </div>
  );
};

export default AdminLayout;
