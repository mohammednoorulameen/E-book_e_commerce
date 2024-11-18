import React, { useEffect, useState } from "react";
import { ShoppingCartIcon, ArrowRightIcon, TrashIcon } from "@heroicons/react/outline";
import { useGetCartItemsQuery,useDeleteCartItemMutation } from '../../../../Services/Apis/UserApi'
import { useNavigate } from "react-router-dom";



const Cart = () => {
  const navigate = useNavigate()
 const [cartItems , setCartItems] = useState([])
  const { data:cart} = useGetCartItemsQuery()
  const [DeleteCartItem] = useDeleteCartItemMutation()

  /**
   * cart detailes
   */
  useEffect(() => {
    if (cart) {
      const transformedItems = cart.cartItems.map((cartItem) => ({
        id: cartItem.productDetailes._id,
        name: cartItem.productDetailes.productName,
        price: parseFloat(cartItem.items.price), 
        quantity: cartItem.items.quantity,
        imageUrl: cartItem.productDetailes.images[0] || "https://via.placeholder.com/100", // Fallback image
      }));
      setCartItems(transformedItems);
    }
  }, [cart]);
  


  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleDelete = async (product_id) => {
    const response = await DeleteCartItem({product_id:product_id})    
    if (response.data) {
      console.log("success")
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  /**
   * Handle check out page 
   */

  const HandleCheckOut = async () =>{
    navigate("/check-out")
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-screen-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Your Cart</h2>

        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border-b transition-transform transform hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md transition-all duration-300 ease-in-out hover:scale-105"
                />
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-500">₹{item.price.toFixed(2)} each</p>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-col sm:flex-row">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden sm:flex-row flex-col gap-2 sm:gap-4">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, Math.max(item.quantity - 1, 1))
                    }
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 w-12 sm:w-auto"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    readOnly
                    className="w-12 text-center border-0 sm:w-10"
                  />
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 w-12 sm:w-auto"
                  >
                    +
                  </button>
                </div>
                <p className="font-semibold text-lg mt-2 sm:mt-0">
                ₹{(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800 transition-all duration-300"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8 flex-col sm:flex-row">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto mb-4 sm:mb-0 transition-all duration-300 ease-in-out flex items-center justify-center gap-2">
            <ShoppingCartIcon className="w-5 h-5" />
            Continue Shopping
          </button>
          <div className="text-right sm:text-left w-full sm:w-auto">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-2xl font-bold">₹{calculateTotal().toFixed(2)}</p>
            <button onClick={HandleCheckOut} className="mt-4 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 w-full sm:w-auto transition-all duration-300 ease-in-out flex items-center justify-center gap-2">
              <ArrowRightIcon className="w-5 h-5" />
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
