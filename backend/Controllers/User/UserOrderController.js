import Cart from "../../Models/CartModel.js";
import Orders from "../../Models/OrderModel.js";
import Products from "../../Models/ProductModel.js";
import mongoose from "mongoose";
import Offer from '../../Models/OfferModel.js'
import razorpayInstance from '../../Config/razorpay.js'

import crypto from 'crypto'



/**
 * getting offer
 */

// const getOffer = async (product_id) =>{
//   try {
//     const offerForProduct = await Offer.find({
//       discountTarget:{$in: [product_id]},
//       status: true,
//       expireDate: { $gt: Date.now() }
//     })

//     const product = await Products.findById(product_id)

//     const offerForCategory = await Offer.find({
//       discountTarget:{$in: [product.category]},
//       status: true,
//       expireDate: { $gt: Date.now() }
//     })

//     const allOffers = [...offerForProduct,...offerForCategory];

//     const largestOffer = allOffers.reduce((max,current)=>{
//       return current.offer > max.offer ? current : max
//     },{offer: 0})

//     return largestOffer
//   } catch (error) {
//     console.log(error);
    
//   }
// }

// const getOffer = async (product_id) => {
//   console.log("product _id",product_id);
  
//   try {
//     const product = await Products.findById(product_id);
//  console.log('product', product)
//     if (!product) {
//       throw new Error(`Product with ID ${product_id} not found`);
//     }

//     const offerForProduct = await Offer.find({
//       discountTarget: { $in: [product_id] },
//       status: true,
//       expireDate: { $gt: Date.now() }
//     });

//     const offerForCategory = await Offer.find({
//       discountTarget: { $in: [product.category] },
//       status: true,
//       expireDate: { $gt: Date.now() }
//     });

//     const allOffers = [...offerForProduct, ...offerForCategory];

//     const largestOffer = allOffers.reduce((max, current) => {
//       return current.offer > max.offer ? current : max;
//     }, { offer: 0 });

//     return largestOffer;
//   } catch (error) {
//     console.error("Error in getOffer:", error.message);
//     throw error;
//   }
// };




const getOffer = async (product_id) => {
  console.log("product _id", product_id);

  try {
    const product = await Products.findById(product_id);
    console.log("product", product);
    if (!product) {
      throw new Error(`Product with ID ${product_id} not found`);
    }

    const offerForProduct = await Offer.find({
      discountTarget: { $in: [product_id] },
      status: true,
      expireDate: { $gt: Date.now() },
    });

    const offerForCategory = await Offer.find({
      discountTarget: { $in: [product.category] },
      status: true,
      expireDate: { $gt: Date.now() },
    });

    const allOffers = [...offerForProduct, ...offerForCategory];

    const largestOffer = allOffers.reduce(
      (max, current) => (current.offer > max ? current.offer : max),
      0 
    );

    return largestOffer; 
  } catch (error) {
    console.error("Error in getOffer:", error.message);
    throw error;
  }
};




/**
 * ordder placing
 */

const PlaceOrder = async (req, res) => {
  const { cartSave,address_id, paymentMethod, totalPrice, couponDiscount } = req.body;
  const userId = req.userId;

  console.log("cartSave:", cartSave);
  console.log("paymentMethod:", paymentMethod);
  console.log("totalPrice:", totalPrice);

  const discountApplied = couponDiscount / cartSave.length;
  const totalAmount = Math.round(totalPrice);

  try {
    if (paymentMethod === 'cashOnDelivery') {
      console.log("Processing Cash on Delivery order...");

      let order = await Orders.findOne({ user_id: userId });

      console.log('cartSave', cartSave)

      const itemsWithOffers = await Promise.all(
        cartSave.map(async (cartItem) => {
          console.log('cartItem', cartItem)
          const offerApplied = await getOffer(cartItem.product_id);
          const payableAmount=cartItem.price-(((offerApplied+discountApplied)/100)*cartItem.price)
          return {
            product_id: cartItem.product_id,
            quantity: cartItem.quantity,
            price: cartItem.price,
            discount: discountApplied,
            offer: offerApplied,
            payableAmount: payableAmount,
            order_status: "Pending",
            payment_status: "Pending",
          };
        })
      );

      if (order) {
        order.items.push(...itemsWithOffers);
        await order.save();
      } else {
        order = await Orders.create({
          user_id: userId,
          items: itemsWithOffers,
          address_id
        });
      }

      // await updateStockAndCart(userId, cartItems);

    /**
     * after order placed remove item cart and stock
     */

    
      res.status(200).json({ message: "Order placed successfully" });
    } else if (paymentMethod === 'razorpay') {
      console.log("Processing Razorpay payment...");

      const options = {
        amount: totalAmount * 100,
        currency: 'INR',
        receipt: `receipt_${new Date().getTime()}`,
      };

      const razorpayOrder = await razorpayInstance.orders.create(options);

      res.status(200).json({ orderId: razorpayOrder.id });
    }
  } catch (error) {
    console.error("Error in PlaceOrder:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};


/**
 * verify payment 
 */



const VerifyPayment = async (req, res) => {
  const userId = req.userId;
        const { payment_id,address_id, order_id, signature, cartSave, couponDiscount } = req.body;
console.log('address_id', address_id)
  const secret = process.env.RAZORPAY_KEY_SECRET; 
  const discountApplied = couponDiscount / cartSave.length;

  try {
    // Generate a signature to verify payment
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${order_id}|${payment_id}`)
      .digest('hex');

    if (generatedSignature !== signature) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    // Process order after successful payment verification
    let order = await Orders.findOne({ user_id: userId });

    const itemsWithOffers = await Promise.all(
      cartSave.map(async (cartItem) => {
        const offerApplied = await getOffer(cartItem.product_id);
        const payableAmount=cartItem.price-(((offerApplied+discountApplied)/100)*cartItem.price)

        return {
          product_id: cartItem.product_id,
          quantity: cartItem.quantity,
          price: cartItem.price,
          discount: discountApplied,
          offer: offerApplied,
          payableAmount,
          order_status: "Pending",
          payment_status: "Paid", 
          payment_id: payment_id,
        };
      })
    );

    if (order) {
      // Add new items to existing order
      order.items.push(...itemsWithOffers);
      await order.save();
    } else {
      // Create a new order if none exists
      order = await Orders.create({
        user_id: userId,
        items: itemsWithOffers,
        address_id

      });
    }

    // Remove items from cart and update stock
    await Promise.all(
      cartSave.map(async (cartItem) => {
        // Remove items from the cart
        await Cart.findOneAndUpdate(
          { user_id: userId },
          { $pull: { items: { product_id:cartItem.product_id } } }
        );

        // Update product stock
        await Products.findOneAndUpdate(
          { _id: cartItem.product_id },
          { $inc: { stock: - cartItem.quantity } }
        );
      })
    );

    res.status(200).json({ success: true, message: "Payment verified and order placed successfully" });
  } catch (error) {
    console.error("Error in VerifyPayment:", error);
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
};






// const PlaceOrder = async (req, res) => {
//   console.log("check");
//   const cartItems = req.body;
//   const user_id = req.userId;
//   try {
//     const order = await Orders.create({
//       user_id: user_id,
//       address_id: cartItems.address_id,
//       items: cartItems.items.map((cartItem) => ({
//         product_id: cartItem.product_id,
//         quantity: cartItem.quantity,
//         price: cartItem.price,
//         order_status: "pending",
//       })),
//     });

//     /**
//      * after order placed remove item cart and stock
//      */

//     await Promise.all(
//       cartItems.items.map(async (cartItem) => {
//         await Cart.findOneAndUpdate(
//           { user_id: user_id },
//           { $pull: { items: { product_id: cartItem.product_id } } }
//         );

//         await Products.findOneAndUpdate(
//           { _id: cartItem.product_id },
//           { $inc: { stock: -cartItem.quantity } }
//         );
//       })
//     );

//     res.status(200).json({ message: "order Placed Successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "order Placed failed" });
//   }
// };

/**
 * get order detailes
 */

const getOrders = async (req, res) => {
  try {
    const user_id = new mongoose.Types.ObjectId(req?.userId);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;
    const totalDetails = await Orders.aggregate([
      { $match: { user_id: user_id } },
      { $unwind: "$items" },
    ]).count("totalCount");

    const totalProducts =
      totalDetails.length > 0 ? totalDetails[0].totalCount : 0;
    const totalPage = Math.ceil(totalProducts / limit);
    const currentPage = page;
    const orderItems = await Orders.find({ user_id })
      .populate("address_id")
      .populate("items.product_id")
      .skip(skip)
      .limit(limit)
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
 * user cancel order
 */

const CancelOrder = async (req, res) => {
  try {
    const user_id = req.userId;
    const { product_id, quantity, order_id } = req.body;
    const order = await Orders.findOneAndUpdate(
      { user_id: user_id, _id: order_id, "items.product_id": product_id },
      { $set: { "items.$.orderStatus": "Cancelled" } },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await Products.findByIdAndUpdate(product_id, {
      $inc: { stock: quantity },
    });
    res.status(200).json({ message: "Order Cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Order cancellation failed", error });
  }
};

export { PlaceOrder, getOrders, CancelOrder, VerifyPayment };
