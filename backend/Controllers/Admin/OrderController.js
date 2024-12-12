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

/**
 * getting top ten products
 */

const GetTopTenProducts = async (req, res) => {
  try {
    const topProducts = await Orders.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product_id",
          orderCount: { $sum: 1 },
          totalQuantitySelled: { $sum: "$items.quantity" },
          totalRevenue: { $sum: "$items.payableAmount" },
        },
      },
      { $sort: { totalQuantitySelled: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          productName: "$productDetails.productName",
          category: "$productDetails.category",
          author: "$productDetails.author",
          orderCount: 1,
          totalQuantitySelled: "$totalQuantitySelled",
          totalRevenue: "$totalRevenue",
        },
      },
    ]);

    res.status(200).json({ message: "success", topProducts });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "internal server error" });
  }
};

/**
 * getting top category
 */

const TopCategory = async (req, res) => {
  try {
    const topCategory = await Orders.aggregate([
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.product_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$productDetails.category",
          totalOrder: { $sum: 1 },
          totalQuantitySelled: { $sum: "$items.quantity" },
          totalRevenue: { $sum: "$items.payableAmount" },
        },
      },
      { $sort: { totalQuantitySelled: -1 } },
      { $limit: 10 },
      {
        $project: {
          _id: 0,
          category: "$_id",
          totalOrder: 1,
          totalQuantitySelled: 1,
          totalRevenue: 1,
        },
      },
    ]);

    res
      .status(200)
      .json({ message: "Get top category successful", topCategory });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Internal server error" });
  }
};

/**
 * get graph data
 */

// const GraphData = async (req, res) => {
//   try {
//     const { period } = req.query;
//     let DateFormat;
//     console.log("checkkc");
//     switch (period) {
//       case "daily":
//         DateFormat = "%Y-%m-%d";
//         break;
//       case "monthly":
//         DateFormat = "%Y-%m";
//         break;
//       case "yearly":
//         DateFormat = "%Y";
//         break;
//       default:
//         DateFormat = "%Y-%m-%d";
//     }
//     console.log("DateFormat", DateFormat);

//     const salesData = await Orders.aggregate([
//       { $unwind: "$items" },
//       {
//         $group: {
//           _id: {
//             $dateToString: { format: DateFormat, date: "$items.itemCreatedAt" },
//           },
//           totalSales: { $sum: "$items.payableAmount" },
//         },
//       },
//       { $sort: { _id: -1 } },
//       { $limit: 7 },
//       { $sort: { _id: 1 } },
//       {
//         $project: {
//           _id: 0,
//           name: "$_id",
//           value: "$totalSales",
//         },
//       },
//     ]);

//     console.log("salesData", salesData);
//     res.status(200).json({ message: "Graph data success", salesData });
//   } catch (error) {
//     console.error("Error fetching graph data:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


const GraphData = async (req, res) => {
  try {
    const { period } = req.query;
    let DateFormat;

    switch (period) {
      case "daily":
        DateFormat = "%Y-%m-%d";
        break;
      case "monthly":
        DateFormat = "%Y-%m";
        break;
      case "yearly":
        DateFormat = "%Y";
        break;
      default:
        DateFormat = "%Y-%m-%d";
    }

    console.log("Using DateFormat:", DateFormat);

    const salesData = await Orders.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: {
            $dateToString: { format: DateFormat, date: "$items.itemCreatedAt" },
          },
          totalSales: { $sum: "$items.payableAmount" },
        },
      },
      { $sort: { _id: -1 } },
      { $limit: 7 },
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 0,
          name: "$_id",
          value: "$totalSales",
        },
      },
    ]);

    console.log("Fetched salesData:", salesData);
    res.status(200).json({ message: "Graph data success", salesData });
  } catch (error) {
    console.error("Error fetching graph data:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  ListOrderDetailes,
  changeOrderStatus,
  GetTopTenProducts,
  TopCategory,
  GraphData,
};
