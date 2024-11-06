import React from "react";
import {
  FaShoppingCart,
  FaUserFriends,
  FaDollarSign,
  FaChartLine
} from "react-icons/fa";

const DashboardWidget = ({ icon, title, value, color }) => (
  <div className={`bg-white rounded-lg shadow p-4 flex items-center ${color}`}>
    <div className="text-3xl mr-4">{icon}</div>
    <div>
      <h3 className="text-gray-600 font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  return (
    
    <div className="p-5 mt-11 bg-gray-100 min-h-screen  ml-20 flex-grow">
      
      <h2 className="text-3xl font-semibold mb-5">Admin Dashboard</h2>
      
      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardWidget
          icon={<FaShoppingCart />}
          title="Total Orders"
          value="1,235"
          color="text-blue-500"
        />
        <DashboardWidget
          icon={<FaUserFriends />}
          title="Total Users"
          value="8,192"
          color="text-green-500"
        />
        <DashboardWidget
          icon={<FaDollarSign />}
          title="Revenue"
          value="$24,300"
          color="text-yellow-500"
        />
        <DashboardWidget
          icon={<FaChartLine />}
          title="Sales Growth"
          value="+12%"
          color="text-purple-500"
        />
      </div>
      
      {/* Recent Orders */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-2 text-gray-600">Order ID</th>
              <th className="p-2 text-gray-600">Date</th>
              <th className="p-2 text-gray-600">Customer</th>
              <th className="p-2 text-gray-600">Amount</th>
              <th className="p-2 text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: "ORD1234", date: "2024-10-01", customer: "John Doe", amount: "$120", status: "Pending" },
              { id: "ORD1235", date: "2024-10-02", customer: "Jane Smith", amount: "$200", status: "Completed" },
              { id: "ORD1236", date: "2024-10-03", customer: "Alice Brown", amount: "$150", status: "Shipped" },
            ].map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.date}</td>
                <td className="p-2">{order.customer}</td>
                <td className="p-2">{order.amount}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Sales Chart Placeholder */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Sales Overview</h3>
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded">
          <p className="text-gray-500">Sales chart goes here</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


// import React from 'react';
// import { FaShoppingCart, FaUsers, FaDollarSign, FaChartLine } from 'react-icons/fa';

// const StatsCard = ({ icon: Icon, title, value, textColor }) => (
//   <div className="bg-white p-6 rounded-lg shadow-sm">
//     <div className="flex items-center gap-4">
//       <div className="text-gray-600">
//         <Icon size={24} />
//       </div>
//       <div>
//         <h3 className="text-sm text-gray-600">{title}</h3>
//         <p className={`text-xl font-semibold ${textColor || 'text-gray-900'}`}>{value}</p>
//       </div>
//     </div>
//   </div>
// );

// const StatusBadge = ({ status }) => {
//   const getStatusStyles = () => {
//     switch (status.toLowerCase()) {
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'completed':
//         return 'bg-green-100 text-green-800';
//       case 'shipped':
//         return 'bg-blue-100 text-blue-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles()}`}>
//       {status}
//     </span>
//   );
// };

// const Dashboard = () => {
//   const recentOrders = [
//     { id: 'ORD1234', date: '2024-10-01', customer: 'John Doe', amount: '$120', status: 'Pending' },
//     { id: 'ORD1235', date: '2024-10-02', customer: 'Jane Smith', amount: '$200', status: 'Completed' },
//     { id: 'ORD1236', date: '2024-10-03', customer: 'Alice Brown', amount: '$150', status: 'Shipped' },
//   ];

//   return (
//     <main className="flex-1 p-6">
//       <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatsCard
//           icon={FaShoppingCart}
//           title="Total Orders"
//           value="1,235"
//         />
//         <StatsCard
//           icon={FaUsers}
//           title="Total Users"
//           value="8,192"
//         />
//         <StatsCard
//           icon={FaDollarSign}
//           title="Revenue"
//           value="$24,300"
//         />
//         <StatsCard
//           icon={FaChartLine}
//           title="Sales Growth"
//           value="+12%"
//           textColor="text-green-600"
//         />
//       </div>

//       {/* Recent Orders */}
//       <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
//         <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="text-left text-gray-600 border-b">
//                 <th className="pb-3">Order ID</th>
//                 <th className="pb-3">Date</th>
//                 <th className="pb-3">Customer</th>
//                 <th className="pb-3">Amount</th>
//                 <th className="pb-3">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentOrders.map((order) => (
//                 <tr key={order.id} className="border-b last:border-b-0">
//                   <td className="py-4">{order.id}</td>
//                   <td className="py-4">{order.date}</td>
//                   <td className="py-4">{order.customer}</td>
//                   <td className="py-4">{order.amount}</td>
//                   <td className="py-4">
//                     <StatusBadge status={order.status} />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Sales Overview */}
//       <div className="bg-white rounded-lg shadow-sm p-6">
//         <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
//         <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
//           <span className="text-gray-500">Sales chart goes here</span>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Dashboard;



// import React, { useState } from 'react';
// import AdminNavbar from '../../Common/AdminNavbar';
// import AdminSidebar from '../../Common/AdminSidebar';
// // import StatsCard from './StatsCard';
// // import StatusBadge from './StatusBadge';
// import { FaShoppingCart, FaUsers, FaDollarSign, FaChartLine } from 'react-icons/fa';

// export default function AdminDashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const recentOrders = [
//     { id: 'ORD1234', date: '2024-10-01', customer: 'John Doe', amount: '$120', status: 'Pending' },
//     { id: 'ORD1235', date: '2024-10-02', customer: 'Jane Smith', amount: '$200', status: 'Completed' },
//     { id: 'ORD1236', date: '2024-10-03', customer: 'Alice Brown', amount: '$150', status: 'Shipped' },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Sidebar */}
//       {/* <AdminSidebar sidebarOpen={sidebarOpen} /> */}

//       <div className="flex-1">
//         {/* Navbar */}
//         {/* <AdminNavbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} /> */}

//         {/* Main Content */}
//         <main className="p-6">
//           <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {/* <StatsCard icon={FaShoppingCart} title="Total Orders" value="1,235" />
//             <StatsCard icon={FaUsers} title="Total Users" value="8,192" />
//             <StatsCard icon={FaDollarSign} title="Revenue" value="$24,300" />
//             <StatsCard icon={FaChartLine} title="Sales Growth" value="+12%" textColor="text-green-600" /> */}
//           </div>

//           {/* Recent Orders */}
//           <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
//             <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="text-left text-gray-600 border-b">
//                     <th className="pb-3">Order ID</th>
//                     <th className="pb-3">Date</th>
//                     <th className="pb-3">Customer</th>
//                     <th className="pb-3">Amount</th>
//                     <th className="pb-3">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* {recentOrders.map((order) => ( */}
//                     <tr  className="border-b last:border-b-0">

//                       <td className="py-4"></td>
//                       <td className="py-4"></td>
//                       <td className="py-4"></td>
//                       <td className="py-4"></td>
//                       <td className="py-4">
//                         {/* <StatusBadge status={order.status} /> */}
//                       </td>
//                     </tr>
//                   {/* ))} */}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Sales Overview */}
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
//             <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
//               <span className="text-gray-500">Sales chart goes here</span>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
