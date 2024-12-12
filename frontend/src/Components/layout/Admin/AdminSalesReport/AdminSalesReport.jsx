import React, { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaUserFriends,
  FaDollarSign,
  FaChartLine,
} from "react-icons/fa";
import { get } from "lodash";
import moment from "moment";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary parts of Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import jsPDF from "jspdf";
import "jspdf-autotable";

import {
  useGetSalesReportQuery,
  useGetUserListQuery,
} from "../../../../Services/Apis/AdminApi";

const DashboardWidget = ({ icon, title, value, color }) => (
  <div className={`bg-white rounded-lg shadow p-4 flex items-center ${color}`}>
    <div className="text-3xl mr-4">{icon}</div>
    <div>
      <h3 className="text-gray-600 font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const AdminSalesReport = () => {
  const [sortBy, setSortBy] = useState("");
  const [salesReport, setSalesReport] = useState([]);
  const [productsPerPage] = useState(9);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [datePicker, setDatePicker] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [SalesItems, setSalesItems] = useState([]);
  const { data } = useGetSalesReportQuery({
    sortBy,
    startDate,
    endDate,
    page: currentPage,
    limit: 10,
  });
  const { data: usersList } = useGetUserListQuery({
    page: 1,
    limit: 10,
  });

  /**
   *  handle change page and take totalPage
   */
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const totalPage = data?.pagination?.totalPage;

  // console.log('salesReport out side ', SalesItems)
  console.log("salesReport", data?.salesReportPagination);

  useEffect(() => {
    if (data?.salesReport) {
      setSalesReport([...data?.salesReport]);

      const transformedItems = data?.salesReport.map((salesData) => ({
        name: salesData.productDetails?.productName || "Unknown Product",
        price: parseFloat(salesData.items?.price) || 0,
        quantity: salesData.items?.quantity || 0,
        user: salesData.userDetails?.email || "Unknown User",
        date: new Date(salesData.items?.itemCreatedAt).toDateString(),
        paymentStatus: salesData.items?.payment_status,
      }));

      // setSalesItems(transformedItems);
      setSalesReport(data.salesReport);

      setTotalPages(Math.ceil(data.salesReport.length / productsPerPage));
      const totalAmount = data.salesReport.reduce(
        (acc, items) => acc + items.items.price,
        0
      );

      /**
       * calculate revenue
       */

      const revenue = data.salesReport.reduce(
        (acc, salesData) => acc + (salesData.items?.payableAmount || 0),
        0
      );

      const totalDiscount = totalAmount - revenue;
      setTotalOrders(data.salesReport.length);
      setTotalDiscount(totalDiscount);
      setRevenue(revenue);
      setTotalSales(totalAmount);
    }
    if (usersList) {
      setTotalUsers(usersList.totalUsers);
    }

    /**
     * pagination table data
     */

    if (data?.salesReportPagination) {
      // const transformedItems = data?.salesReportPagination
      const transformedItems = data?.salesReportPagination.map((salesData) => ({
        name: salesData.productDetails?.productName || "Unknown Product",
        price: parseFloat(salesData.items?.price) || 0,
        quantity: salesData.items?.quantity || 0,
        user: salesData.userDetails?.email || "Unknown User",
        date: new Date(salesData.items?.itemCreatedAt).toDateString(),
        paymentStatus: salesData.items?.payment_status,
      }));
      setSalesItems(transformedItems);
    }
  }, [data, usersList]);

  const salesChartData = {
    labels: SalesItems.map((item) => item.date),
    datasets: [
      {
        label: "Sales Revenue",
        data: SalesItems.map((item) => item.price * item.quantity),
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgb(75, 192, 192)",
        tension: 0.4,
      },
      {
        label: "Quantity Sold",
        data: SalesItems.map((item) => item.quantity),
        fill: true,
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgb(255, 159, 64)",
        tension: 0.4,
      },
      {
        label: "Discounts",
        data: SalesItems.map((item) => item.price * item.quantity * 0.1),
        fill: true,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgb(153, 102, 255)",
        tension: 0.4,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Sales Overview",
      },
      tooltip: {
        mode: "nearest",
        intersect: false,
      },
    },
  };

  /**
   * sort
   */

  const HandleSortBy = (value) => {
    if (value === "customDate") {
      setDatePicker(true);
    } else {
      setDatePicker(false);
    }
    setSortBy(value);
  };

  /**
   * handle pdf
   */

  const headers = [
    { name: "Product Name", key: "productDetails.productName" },
    { name: "User Email", key: "userDetails.email" },
    { name: "Order Date", key: "items.itemCreatedAt" },
    { name: "Payment Status", key: "items.payment_status" },
    { name: "Payment ID", key: "items.payment_id" },
  ];

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Sales Report", 14, 20);

    let dateRangeText = "";
    if (sortBy === "daily") {
      dateRangeText = `Date Range: ${moment().format("DD/MM/YYYY")}`;
    } else if (sortBy === "weekly") {
      dateRangeText = `Date Range: ${moment()
        .subtract(7, "days")
        .format("DD/MM/YYYY")} - ${moment().format("DD/MM/YYYY")}`;
    } else if (sortBy === "yearly") {
      dateRangeText = `Date Range: ${moment()
        .subtract(1, "year")
        .format("DD/MM/YYYY")} - ${moment().format("DD/MM/YYYY")}`;
    } else if (sortBy === "customDate") {
      dateRangeText = `Date Range: ${startDate} - ${endDate}`;
    }
    doc.setFontSize(12);
    doc.text(dateRangeText, 14, 30);

    const totalInfo = [
      `Total Sales: Rs.${totalSales}`,
      `Total Discount: Rs.${totalDiscount}`,
      `Total Revenue: Rs.${revenue}`,
      `Total Orders: ${totalOrders}`,
    ];
    doc.setFontSize(12);
    let yPos = 40;
    totalInfo.forEach((info) => {
      doc.text(info, 14, yPos);
      yPos += 10;
    });

    const tableData = salesReport.map((list) =>
      headers.map((header) => {
        return header.key === "items.itemCreatedAt"
          ? moment(get(list, header.key)).format("DD/MM/YYYY")
          : header.key === "items.payment_id"
          ? list.items.payment_id
            ? "Razorpay"
            : "COD"
          : get(list, header.key, "N/A");
      })
    );

    doc.autoTable({
      head: [headers.map((header) => header.name)],
      body: tableData,
      startY: yPos + 10,
      margin: { top: 40 },
      styles: { fontSize: 10 },
    });

    doc.save("sales_report.pdf");
  };

  return (
    <div className="p-5 mt-11 bg-gray-100 min-h-screen ml-20 flex-grow flex flex-col">
      <h2 className="text-3xl font-semibold mb-5">Admin Sales Report</h2>

      {/* Date Range Selection */}
      <div className="mb-6 flex gap-4 items-center">
        <div>
          <label className="block text-gray-600 font-semibold">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-semibold">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2 border rounded"
          />
        </div>
        {/* <button
        type="submit"
          onClick={() => console.log("Fetching data...")} // Replace with actual API call logic if needed
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Apply
        </button> */}
      </div>

      {/* Sorting Options */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => HandleSortBy("date")}
          className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 ${
            sortBy === "date" ? "bg-blue-700" : ""
          }`}
        >
          Sort by Date
        </button>
        <button
          onClick={() => HandleSortBy("month")}
          className={`px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 ${
            sortBy === "month" ? "bg-green-700" : ""
          }`}
        >
          Sort by Month
        </button>
        <button
          onClick={() => HandleSortBy("year")}
          className={`px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 ${
            sortBy === "year" ? "bg-yellow-700" : ""
          }`}
        >
          Sort by Year
        </button>
        <button
          onClick={() => HandleSortBy("customDate")}
          className={`px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 ${
            sortBy === "customDate" ? "bg-yellow-700" : ""
          }`}
        >
          Custom date
        </button>
      </div>

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardWidget
          icon={<FaShoppingCart />}
          title="Total Orders"
          value={totalOrders}
          color="text-blue-500"
        />
        <DashboardWidget
          icon={<FaUserFriends />}
          title="Total Users"
          value={totalUsers}
          color="text-green-500"
        />
        <DashboardWidget
          icon={<FaDollarSign />}
          title="Revenue"
          value={`$${revenue}`}
          color="text-yellow-500"
        />
        <DashboardWidget
          icon={<FaChartLine />}
          title="Total Sales"
          value={`$${totalSales}`}
          color="text-purple-500"
        />
        {/* <DashboardWidget
        icon={<FaChartLine />}
        title="Total Sales"
        value={`$${totalDiscount}`}
        color="text-purple-500"
      /> */}
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-2 text-gray-600">Order Name</th>
              <th className="p-2 text-gray-600">Date</th>
              <th className="p-2 text-gray-600">Quantity</th>
              <th className="p-2 text-gray-600">Customer</th>
              <th className="p-2 text-gray-600">Amount</th>
              <th className="p-2 text-gray-600">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {SalesItems.map((salesItem) => (
              <tr key={salesItem.id} className="border-b">
                <td className="p-2">{salesItem.name}</td>
                <td className="p-2">{salesItem.date}</td>
                <td className="p-2">{salesItem.quantity}</td>
                <td className="p-2">{salesItem.user}</td>
                <td className="p-2">{salesItem.price}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      salesItem.paymentStatus === "Completed"
                        ? "bg-green-100 text-green-600"
                        : salesItem.paymentStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {salesItem.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onPageChannge={handlePageChange}
      />
      </div>

      {/* Sales Chart Placeholder */}
      {/* <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Sales Overview</h3>
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded">
          <p className="text-gray-500">Sales chart goes here</p>
        </div>
      </div> */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Sales Overview</h3>
        <div className="flex items-center justify-center w-full h-[400px] bg-gray-100 rounded">
          <Line data={salesChartData} options={chartOptions} />
        </div>
      </div>
    
      {/* Download Button */}
      <div className="mt-auto flex justify-center">
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600"
        >
          Download Report
        </button>
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPage, onPageChannge }) => {
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <div className="flex justify-end mt-4">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChannge(page)}
          className={`px-3 py-1 mx-1 border rounded ${
            page === currentPage
              ? "bg-indigo-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default AdminSalesReport;

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
