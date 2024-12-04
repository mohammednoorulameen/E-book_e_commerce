import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaBell,
  FaFileExport,
  FaFileImport,
  FaPencilAlt,
  FaTrashAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useOrdersListQuery } from "../../../../Services/Apis/AdminApi";

const AdminProducts = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("products");
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, refetch } = useOrdersListQuery({
    page: currentPage,
    limit: 10,
  });
  // console.log('currentPage,total', currentPage,total)
  console.log("data", data);

  const totalPage = data?.totalPage || 1;
  const orderItems = data?.orderItems;
console.log('orderItems', orderItems)
  useEffect(() => {
    if (orderItems) {
      const uniqueUsers = new Map(); 
  
      orderItems.forEach((order) => {
        const userId = order.user_id._id;
        if (!uniqueUsers.has(userId)) {
          uniqueUsers.set(userId, {
            id: userId,
            email: order.user_id.email,
            username: order.user_id.username,
            phone: order.user_id.phone,
            status: order.items[0]?.orderStatus || "N/A",
            orderDate: new Date(order.items[0]?.itemCreatedAt).toLocaleDateString(),
          });
        }
      });
      setUser(Array.from(uniqueUsers.values()));
    }
  }, [orderItems]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    refetch();
  };

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return <p>Failed to load products. Please try again later.</p>;
  }



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-4 border-b mb-6">
          <button
            className={`pb-4 px-2 ${
              activeTab === "products"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("products")}
          >
            Orders
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Orders</h2>
          <div className="flex gap-3">
            <div className="relative">
              <input
                placeholder="Search..."
                className=" border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-6">No</th>
                <th className="text-left py-4 px-6">Email</th>
                <th className="text-left py-4 px-6">Username</th>
                <th className="text-left py-4 px-6">Mobile</th>
                <th className="text-left py-4 px-6">Order Date</th>
                <th className="text-left py-4 px-6">Detailes</th>
                <th className="text-left py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {user.map((userItem, index) => (
                <tr
                  key={userItem.id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    {(currentPage - 1) * 10 + index + 1}
                  </td>
                  <td className="py-4 px-6">{userItem.email}</td>
                  <td className="py-4 px-6">{userItem.username}</td>
                  <td className="py-4 px-6">{userItem.phone}</td>
                  <td className="py-4 px-6">{userItem.orderDate}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => navigate( `/admin/ordersdetails/${userItem.id}`)}
                      className={`px-3 py-1 rounded-full text-sm ${"bg-green-100 text-green-800"}`}
                    >
                      Detailes
                    </button>
                  </td>
                  <td className="py-4 px-8">
                    <div className="flex gap-2">
                      <button className="text-gray-600 hover:text-red-600">
                        <FaTrashAlt className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null; // Don't render if only one page

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-end mt-4">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
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


// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <div className="flex justify-end mt-4">
//       {pages.map((page) => (
//         <button
//           key={page}
//           onClick={() => onPageChange(page)}
//           className={`px-3 py-1 mx-1 border rounded ${
//             page === currentPage
//               ? "bg-indigo-600 text-white"
//               : "hover:bg-gray-100"
//           }`}
//         >
//           {page}
//         </button>
//       ))}
//     </div>
//   );
// };

export default AdminProducts;
