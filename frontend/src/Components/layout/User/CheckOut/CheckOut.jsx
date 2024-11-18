import { Card, CardContent } from "@mui/material";
import { ShoppingCart, Truck } from "lucide-react"; // Importing Truck icon for shipping
import { useNavigate } from "react-router-dom";



export default function Component() {
  const navigate = useNavigate();
  
  
  /**
   * Handle Continue Shopping navigation
   */

  const HandleContinueShopping = () =>{
    navigate('/shop')
  }

  /**
   * handle continue
   */

  const HandleContinue = () =>{
    navigate("/new-order-payment")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Order Summary */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <img
                    alt="Product thumbnail"
                    className="rounded-lg object-cover h-20 w-20"
                    src="/placeholder.svg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">Groove 2561</h3>
                    <p className="text-sm text-gray-500">Quantity: 3</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹125250.00</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹125250.00</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span>Total Discount</span>
                    <span>-₹0.00</span>
                  </div>
                  <div className="flex justify-between font-medium mt-4 pt-4 border-t">
                    <span>Total</span>
                    <span>₹125250.00</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Address
              </h2>
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">
                  No addresses found. Add a new address below.
                </p>
                <button className="w-full flex items-center justify-center gap-2 border border-black bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-100 active:scale-95 transition-all duration-300 ease-in-out">
                  + Add New Address
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-4">
          <button onClick={HandleContinue} className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 active:scale-95 transition-all duration-300 ease-in-out">
            Continue
          </button>
          <button onClick={HandleContinueShopping} className="w-full border border-black text-black py-3 rounded-lg hover:bg-gray-100 active:scale-95 transition-all duration-300 ease-in-out">
            Continue Shopping
          </button>
        </div>
      </main>
    </div>
  );
}
