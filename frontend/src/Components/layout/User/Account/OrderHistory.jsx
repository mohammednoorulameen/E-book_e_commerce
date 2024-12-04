import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, Box, Collapse } from "@mui/material";
import { Button, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import {
  useGetOrderDetailesQuery,
  useCancelOrderMutation,
} from "../../../../Services/Apis/UserApi";
import { OrderCancelModal , OrderReturnModal} from "../../../Modals/OrderModal";

const OrderHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [isOrderCancelModalOpen, setisOrderCancelModalOpen] = useState(false);
  const [isOrderReturnModalOpen, setisOrderReturnModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [OderData, setOderData] = useState([]);
  const [CancelOrder] = useCancelOrderMutation();
  const { data, refetch } = useGetOrderDetailesQuery({
    page: currentPage,
    limit: 5,
  });

  const totalPage = data?.totalPage || 1;

  useEffect(() => {
    if (data?.orderItems) {
      const oderdata = data.orderItems.flatMap((order) =>
        order.items.map((item) => ({
          orderId: order._id,
          orderDate: new Date(
            order.items[0]?.itemCreatedAt
          ).toLocaleDateString(),
          totalItems: order.items.length,
          status: order.items[0]?.orderStatus || "N/A",
          address: `${order.address_id?.address || "N/A"}, ${
            order.address_id?.city || "N/A"
          }, ${order.address_id?.state || "N/A"}, ${
            order.address_id?.locality || "N/A"
          }, ${order.address_id?.pincode || "N/A"}, ${
            order.address_id?.landmark || "N/A"
          }`,
          productId: item.product_id?._id,
          productName: item.product_id?.productName || "N/A",
          category: item.product_id?.category || "N/A",
          quantity: item.quantity,
        }))
      );
      console.log("oderdata", oderdata);
      setOderData(oderdata);
    }
  }, [data]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    refetch();
  };

  const handleViewDetails = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  /**
   *  handle cancel modal
   */

  const handleOrderCancelOpenModal = (order) => {
    setSelectedOrder(order);
    setisOrderCancelModalOpen(true);
  };

  const handleOrderCancelCloseModal = () => {
    setisOrderCancelModalOpen(false);
    setSelectedOrder(null);
  };

  const handleCancelOrder = async () => {
    if (!selectedOrder) return;

    const { product_id, quantity, order_id } = selectedOrder;
    const response = await CancelOrder({
      product_id,
      quantity,
      order_id,
    });
    console.log("response", response);
    if (response.data) {
      refetch();
      handleOrderCancelCloseModal();
    }
  };

  /**
   * return modal 
   */

  const handleOrderReturnOpenModal = () =>{
    setisOrderReturnModalOpen(true)
  }

  const handleOrderReturnCancelModal = () =>{
    setisOrderReturnModalOpen(false)
  }

  const handleSubmitOrderreturn = (value) =>{
    console.log('value', value)
        // if (input.trim == "") {
        //   setError(true)
        // }else{
        //   setError(false)
        //   console.log("Form submitted successfull");
          
        // }
  }

  return (
    <div>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Order History</h2>
        <div className="space-y-4">
          {OderData.length > 0 ? (
            OderData.map((OrderData) => {
              const isExpanded = expandedOrderId === OrderData.orderId;

              return (
                <Card key={`${OrderData.productId}-${OrderData.orderId}`}>
                  <CardHeader
                    title={`Order #${uuidv4()}`}
                    subheader={`Placed on: ${OrderData.orderDate}`}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      Total Items = {OrderData.totalItems}
                    </Typography>
                    <Typography 
                              className={`!px-3 !py-1 !m-2 w-1/6 !hover:bg-blue-500 !rounded-full !text-sm ${
                                OrderData.status == 'Penting' ? 
                                "!bg-blue-300 !text-green-800" :
                                OrderData.status == 'Shipped' ?
                                "!bg-blue-400 !text-green-800":
                                OrderData.status == 'Delivered'?
                                "!bg-green-200 !text-green-800": ""
                              }`}
                    variant="body2" color="textSecondary">
                      Status = {OrderData.status}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Address: {OrderData.address}
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Button
                        onClick={() => handleViewDetails(OrderData.orderId)}
                        variant="outlined"
                      >
                        {isExpanded ? "Hide Details" : "View Details"}
                      </Button>
                      {OrderData.status !== "Cancelled" &&  OrderData.status !== "Delivered"  ? (
                        <Button
                          onClick={() =>
                            handleOrderCancelOpenModal({
                              order_id: OrderData.orderId,
                              product_id: OrderData.productId,
                              quantity: OrderData.quantity,
                            })
                          }
                          variant="outlined"
                          color="error"
                        >
                          Cancel
                        </Button>
                      ):(
                        <Button
                        onClick={() =>
                          handleOrderReturnOpenModal({ })
                        }
                        variant="outlined"
                        color="return"
                      >
                        Return
                      </Button>
                      )}
                    </Box>

                    {/* Collapse for additional details */}
                    <Collapse in={isExpanded}>
                      <Box mt={2}>
                        <Box
                          key={`${OrderData.productId}-${OrderData.orderId}`}
                          mb={2}
                        >
                          <Typography variant="body2" color="textSecondary">
                            Product ID: {OrderData.productId}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Product Name: {OrderData.productName}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Category: {OrderData.category}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Quantity: {OrderData.quantity}
                          </Typography>
                        </Box>
                      </Box>
                    </Collapse>
                  </CardContent>
                </Card>
              );
            })
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
      {selectedOrder && (
        <OrderCancelModal
          isOpen={isOrderCancelModalOpen}
          onClose={handleOrderCancelCloseModal}
          onSubmit={handleCancelOrder}
          // error = {error}
        />
      )}

    <OrderReturnModal 
    isOpen={isOrderReturnModalOpen}
    onClose={handleOrderReturnCancelModal}
    onSubmit={handleSubmitOrderreturn}
    />

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
