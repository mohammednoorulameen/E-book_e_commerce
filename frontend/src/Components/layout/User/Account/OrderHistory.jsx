import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader,Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { useGetOrderDetailesQuery } from '../../../../Services/Apis/UserApi';

const OrderHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate()
  const { data, refetch } = useGetOrderDetailesQuery({
    page: currentPage,
    limit: 5
  });

  const totalPage = data?.totalPage || 1;

  /**
   * Set order items 
   */

  useEffect(() => {
    if (data?.orderItems) {
      setOrders(data.orderItems); 
    }
  }, [data]);

  console.log('orders', orders);

  /**
   * Handle page change 
   */
  const handlePageChange = (page) => {
    setCurrentPage(page);
    refetch(); 
  };

  /**
   * handle view product 
   */

  const handleViewDetails = (product_id)=>{
    navigate(`/productdetails/${product_id}`)
  }

  /**
   * handle cancel oder
   */


  const handleCancelOrder = (order_id) => {
    // Add your cancel order logic here
    console.log(`Order ${order_id} cancelled`);
  };
  return (
    <div>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Order History</h2>
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((item) => (
              <Card key={item._id || item.productDetails._id} > 
                <CardHeader>
                  <Typography>Order #{item._id}</Typography>
                  {/* <Typography>Order #{item._id.toString().padStart(5, '0')}</Typography> */}
                </CardHeader>
                <CardContent>
                <p className="text-sm text-black">Placed on: {item.productDetails.productName}</p>
                <p className="text-sm text-gray-500">Placed on: {new Date().toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">Total:  ₹{item.items.price}.00</p>
                  <p className="text-sm text-gray-500">Status: {item.items.orderStatus}</p>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Button
                      onClick={() => handleViewDetails(item.productDetails._id)}
                      variant="outlined"
                    >
                      View Details
                    </Button>
                    {/* Add the Cancel button */}
                    <Button
                      onClick={() => handleCancelOrder(item._id)}
                      variant="outlined"
                      color="error"
                    >
                      Cancel
                    </Button>
                  </Box>
                  {/* <Button onClick={()=> handleviewDetailes(item.productDetails._id)}  className="mt-4" variant="outlined">View Details</Button> */}
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No orders found</p> 
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
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

export default OrderHistory;


