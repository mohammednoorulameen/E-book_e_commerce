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


  try {
    const product = await Products.findById(product_id);

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
  const user_id = req.userId;
  const discountApplied = couponDiscount / cartSave.length;
  const totalAmount = Math.round(totalPrice);

  try {
    if (paymentMethod === 'cashOnDelivery') {
      console.log("Processing Cash on Delivery order...");

      let order = await Orders.findOne({ user_id: user_id });

      if (order) {
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
              payableAmount: payableAmount,
              order_status: "Pending",
              payment_status: "Pending",
            };
          })
        );
      
        order.items.push(...itemsWithOffers);
        await order.save();

      } else {
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
              payableAmount: payableAmount,
              order_status: "Pending",
              payment_status: "Pending",
            };
          })
        );


        order = await Orders.create({
          user_id: user_id,
          items: itemsWithOffers,
          address_id
        });


      }

    /**
     * after order placed remove item cart and stock
     */

    await Promise.all(
      cartSave.map(async (cartItem) => {
        await Cart.findOneAndUpdate(
          { user_id: user_id },
          { $pull: { items: { product_id:cartItem.product_id } } }
        );
        // update product stock
        await Products.findOneAndUpdate(
          { _id: cartItem.product_id },
          { $inc: { stock: - cartItem.quantity } }
        );
      })
    );
      res.status(200).json({ message: "Order placed successfully" });

    } else if (paymentMethod === 'razorpay') {
      console.log("Processing Razorpay payment...");

      const options = {
        amount: totalAmount * 100,
        currency: 'INR',
        receipt: `receipt_${new Date().getTime()}`,
      };

      const order = await razorpayInstance.orders.create(options);

      res.status(200).json({order});
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
  try {
    const user_id = req.userId;
    console.log('Checking user_id', user_id);
    const { payment_id, address_id, order_id, signature, cartSave, couponDiscount } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET; 
    
    // Calculate the discount for each item (if needed, adjust the logic)
    const discountApplied = couponDiscount / cartSave.length;

    // Find the existing order or create a new one
    let order = await Orders.findOne({ user_id: user_id });

    console.log('Checking order', order);
    
   if (order) {
    const itemsWithOffers = await Promise.all(
      cartSave.map(async (cartItem) => {
        const offerApplied = await getOffer(cartItem.product_id);
        const payableAmount = cartItem.price - (((offerApplied + discountApplied) / 100) * cartItem.price);

        return {
          product_id: cartItem.product_id,
          quantity: cartItem.quantity,
          price: cartItem.price,
          discount: discountApplied,
          offer: offerApplied,
          payableAmount: payableAmount,
          order_status: "Pending",
          payment_status: "Paid", 
          payment_id: payment_id,
        };
      })
    );

   
      console.log('Order found, adding items');
      // If the order already exists, update it
      order.items.push(...itemsWithOffers);
      await order.save();
    } else {
      console.log('Creating new order');
      // If the order doesn't exist, create a new one
      order = await Orders.create({
        user_id: user_id,
        items: itemsWithOffers,
        address_id
      });
    }

    // Remove cart items and update product stock
    await Promise.all(
      cartSave.map(async (cartItem) => {
        console.log("Updating cart and stock for product:", cartItem.product_id);
        
        // Remove item from the cart
        await Cart.findOneAndUpdate(
          { user_id: user_id },
          { $pull: { items: { product_id: cartItem.product_id } } }
        );

        // Decrease stock
        await Products.findOneAndUpdate(
          { _id: cartItem.product_id },
          { $inc: { stock: -cartItem.quantity } }
        );
      })
    );

    // Generate signature to verify payment
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${order_id}|${payment_id}`)
      .digest('hex');

    // Verify payment signature
    if (generatedSignature !== signature) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    // Update payment status in the order if signature matches
    if (generatedSignature === signature) {
      await Orders.updateOne(
        { user_id: user_id },
        { $set: { "items.$[items].payment_status": 'paid' } },
        { arrayFilters: [{ "items.payment_id": payment_id }] }
      );
    }

    res.status(200).json({ success: true, message: "Payment verified and order placed successfully" });
  } catch (error) {
    console.error("Error in VerifyPayment:", error);
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
};



// const VerifyPayment = async (req, res) => {
//   try {
//   const user_id = req.userId;
//   console.log('chckin geting user_id', user_id)
//   const { payment_id,address_id, order_id, signature, cartSave, couponDiscount } = req.body;
//   const secret = process.env.RAZORPAY_KEY_SECRET; 
//   const discountApplied = couponDiscount / cartSave.length;

//       let order = await Orders.findOne({ user_id: user_id });

//       console.log(' checkin order', order)
//     if (order) {
//       const itemsWithOffers = await Promise.all(
//         cartSave.map(async (cartItem) => {
//           const offerApplied = await getOffer(cartItem.product_id);
//           const payableAmount=cartItem.price-(((offerApplied+discountApplied)/100)*cartItem.price)
  
//           return {
//             product_id: cartItem.product_id,
//             quantity: cartItem.quantity,
//             price: cartItem.price,
//             discount: discountApplied,
//             offer: offerApplied,
//             payableAmount:payableAmount,
//             order_status: "Pending",
//             payment_status: "Paid", 
//             payment_id: payment_id,
//           };
//         })
//       );
//       console.log('check first order', order)
//       order.items.push(...itemsWithOffers);
//       await order.save();

//     } else {

//       const itemsWithOffers = await Promise.all(
//         cartSave.map(async (cartItem) => {
//           const offerApplied = await getOffer(cartItem.product_id);
//           const payableAmount=cartItem.price-(((offerApplied+discountApplied)/100)*cartItem.price)
  
//           return {
//             product_id: cartItem.product_id,
//             quantity: cartItem.quantity,
//             price: cartItem.price,
//             discount: discountApplied,
//             offer: offerApplied,
//             payableAmount:payableAmount,
//             order_status: "Pending",
//             payment_status: "Paid", 
//             payment_id: payment_id,
//           };
//         })
//       );

//       order = await Orders.create({
//         user_id: user_id,
//         items: itemsWithOffers,
//         address_id

//       });
//       console.log('order check cross ', order  )
//     }

    

//     /**
//      * remove cart items
//      * update stock 
//      */

//     await Promise.all(
//       cartSave.map(async (cartItem) => {
//         console.log("check come inside ")
//         await Cart.findOneAndUpdate(
//           { user_id: user_id },
//           { $pull: { items: { product_id:cartItem.product_id } } }
//         );
//         await Products.findOneAndUpdate(
//           { _id: cartItem.product_id },
//           { $inc: { stock: - cartItem.quantity } }
//         );
//       })
//     );

//       //  Generate a signature to verify payment
//     const generatedSignature = crypto
//       .createHmac('sha256', secret)
//       .update(`${order_id}|${payment_id}`)
//       .digest('hex');

//     if (generatedSignature !== signature) {
//       return res.status(400).json({ success: false, message: 'Invalid payment signature' });
//     }

//     if (generatedSignature === signature) {
//       await Orders.updateOne(
//         {user_id: user_id},
//         { $set: {"items.$[items].payment_status": 'paid'}},
//         { arrayFilters: [{"items.payment_id": payment_id}]}
//       )
//     }

//     res.status(200).json({ success: true, message: "Payment verified and order placed successfully" });
//   } catch (error) {
//     console.error("Error in VerifyPayment:", error);
//     res.status(500).json({ success: false, message: "Something went wrong", error });
//   }
// };






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
