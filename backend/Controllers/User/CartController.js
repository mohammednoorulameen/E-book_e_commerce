import mongoose from "mongoose";
import Cart from "../../Models/CartModel.js";
import Product from '../../Models/ProductModel.js'
/**
 * add to cart
 */

const AddCart = async (req, res) => {
  const userId = req.userId;
  const { product_id, price, quantity = 1 } = req.body;
  try {
    /**
     * handle stock quantity
     */
    const product = await Product.findById(product_id)
    if (!product) {
      return res.status(404).json({ message: "product not fount"})
    }

    let cart = await Cart.findOne({user_id:userId})

    const ProductAlreadyinCart = cart?.items.some((item)=>{
      item.product_id.equals(product_id)
    })
    if (ProductAlreadyinCart) {
      
      if (product.stock < quantity) {
        return res.status(400).json({ message: "insufficient stock"})
      }
      
      product.stock -= quantity
      await product.save()
    }
    // let cart = await Cart.findOne({ user_id: userId });


    /**
     * handle add to cart
     */

    if (cart) {
      const existingProductIndex = cart.items.findIndex((item) =>
        item.product_id.equals(product_id)
      );

      if (existingProductIndex > -1) {
        cart.items[existingProductIndex].quantity = quantity;
        cart.items[existingProductIndex].price = price;
      } else {
        cart.items.push({ product_id, price, quantity });
      }

      await cart.save();
    } else {
      cart = await Cart.create({
        user_id: userId,
        items: [{ product_id, price, quantity }],
        totalPrice: 0,
      });
    }

    // console.log('cart', cart);
    res.status(200).json({ message: "Product successfully added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add product to cart" });
  }
};

/**
 * get cart products
 */

const GetCartItems = async (req, res) => {
  const user_id = req.userId;
  try {
    const cartItems = await Cart.aggregate([
      {
        $match: { user_id: new mongoose.Types.ObjectId(user_id) },
      },
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "products",
          localField: "items.product_id",
          foreignField: "_id",
          as: "productDetailes",
        },
      },
      {
        $unwind: "$productDetailes",
      },
      {
        $project: {
          _id: 0,
          "items.quantity": 1,
          "items.price": 1,
          "productDetailes._id": 1,
          "productDetailes.productName": 1,
          "productDetailes.price": 1,
          "productDetailes.stock": 1,
          "productDetailes.author": 1,
          "productDetailes.description": 1,
          "productDetailes.category": 1,
          "productDetailes.publisher": 1,
          "productDetailes.images": 1,
          totalPrice: 1,
        },
      },
    ]);
    console.log("cartItems", cartItems);
    await res.status(200).json({ message: "success", cartItems });
  } catch (error) {
    res.status(500).json({ message: "failed get cart items  " });
  }
};

/**
 * delete cart product
 */

const DeleteCartProduct = async (req, res) => {
  const userId = req.userId;
  const {product_id} = req.body;
  try {
    let cart = await Cart.findOneAndUpdate(
      { user_id: userId },
      { $pull: { items: { product_id: product_id } } }
    );
    res.status(200).json({ message: "cart item delete successfully" });
  } catch (error) {
    console.log("delete failed", error);

    res.status(500).json({ message: "cart item delete failed" });
  }
};
export { AddCart, GetCartItems, DeleteCartProduct };
