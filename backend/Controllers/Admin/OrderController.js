import Cart from "../../Models/CartModel.js";
import Orders from "../../Models/OrderModel.js";
import Products from "../../Models/ProductModel.js";
import mongoose from "mongoose";

/**
 *  getting order deatailes
 */

const ListOrderDetailes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;
    const totalDetails = await Orders.aggregate([
      { $match: {} },
      { $unwind: "$items" },
      { $count: "totalCount" },
    ]);

    const totalProducts =
      totalDetails.length > 0 ? totalDetails[0].totalCount : 0;
    const totalPage = Math.ceil(totalProducts / limit);
    const currentPage = page;
    const orderItems = await Orders.find({})
      .populate("user_id")
      .populate("address_id")
      .populate("items.product_id")
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      message: "Orders retrieved successfully",
      orderItems,
      totalPage,
      currentPage,
      totalProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to retrieve orders",
      error: error.message,
    });
  }
};

/**
 * change order status
 */

const changeOrderStatus = async (req, res) => {
  const { user_id, order_id, action } = req.body;
  if (!user_id || !order_id || !action) {
    return res.status(400).json({ message: "Invalid input data" });
  }
  try {
    let order = await Orders.findOneAndUpdate(
      { user_id: user_id, "items._id": order_id },
      { $set: { "items.$.orderStatus": action } },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res
      .status(200)
      .json({ message: `Orders status changed successfully ${action}` });
  } catch (error) {
    res.status(500).json({ message: "Orders status changed failed" });
  }
};
export { ListOrderDetailes, changeOrderStatus };
