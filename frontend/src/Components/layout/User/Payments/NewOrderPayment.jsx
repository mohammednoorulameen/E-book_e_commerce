import { Card, CardContent, Button, Radio, RadioGroup } from "@mui/material";
import {
  useGetAddressesQuery,
  useGetCartItemsQuery,
  usePlaceOrderMutation,
} from "../../../../Services/Apis/UserApi";
import { Tag, Truck, Wallet } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NewOrderPayment = () => {
  const { data: cart } = useGetCartItemsQuery();
  const { data: addressesData, refetch } = useGetAddressesQuery(); 
  const location = useLocation();
  const navigate = useNavigate()
  const cartSaveAddress = location.state?.address_id || [];
  const [PlaceOrder,{isSuccess}] =  usePlaceOrderMutation();
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  // const [cartSave, setCartSave] = useState([])
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  useEffect(() => {
    if (addressesData?.addresses) {
      const selected = addressesData.addresses.find(
        (address) => address._id === cartSaveAddress
      );
      setSelectedAddress(selected || null);
    }
    if (cart) {
      const transformedItems = cart.cartItems.map((cartItem) => ({
        id: cartItem.productDetailes._id,
        name: cartItem.productDetailes.productName,
        price: parseFloat(cartItem.items.price),
        stock: cartItem.productDetailes.stock,
        quantity: cartItem.items.quantity,
        totalPrice: cartItem.totalPrice,
      }));
      setCartItems(transformedItems);
    }
  }, [addressesData, cart]);

  // Calculate the total price of the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, item) => item.totalPrice, 0);
  };

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  /**
   * handlle HandleOrder
   */
  

  const HandleOrder =async () =>{
    const newCartSave = cartItems.map((item) => ({
      address_id: selectedAddress._id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));
        // setCartSave(newCartSave)
    const response = await PlaceOrder(newCartSave)
    if (response.data) {
      alert("Order placed successfully!");
      navigate('/shop')
    }
  }


  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-4">
        <h1 className="text-xl text-center font-bold mb-6">
          Complete Your Order
        </h1>
        <div className="max-w-2xl mx-auto">
          {/* Shipping Address Card */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="h-5 w-5" />
                <h2 className="font-semibold text-sm">Shipping Address</h2>
              </div>

              {selectedAddress && (
                <div className="space-y-2 text-sm">
                  <p className="font-bold">{selectedAddress.name}</p>
                  <p>
                    <strong>Address:</strong> {selectedAddress.address},{" "}
                    {selectedAddress.locality}, {selectedAddress.city},{" "}
                    {selectedAddress.state}, {selectedAddress.pincode},{" "}
                    <strong> Address Type:</strong>{" "}
                    {selectedAddress.addressType}
                  </p>
                  <p>
                    <strong>Landmark:</strong>{" "}
                    {selectedAddress.landmark || "N/A"}
                    <strong> Phone:</strong> {selectedAddress.phone}
                    {selectedAddress.altPhone &&
                      ` / ${selectedAddress.altPhone}`}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Method Card */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <h2 className="font-semibold mb-3 text-sm">Payment Method</h2>
              <RadioGroup
                value={paymentMethod}
                onChange={handlePaymentChange}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-3 bg-blue-50">
                  <Radio value="razorpay" id="razorpay" className="mr-2" />
                  <label htmlFor="razorpay" className="flex-1 text-sm">
                    Razor Pay
                  </label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <Radio value="wallet" id="wallet" className="mr-2" />
                  <label
                    htmlFor="wallet"
                    className="flex-1 flex justify-between text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <Wallet className="h-4 w-4" />
                      Wallet
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Balance Amount: ₹0.00
                    </span>
                  </label>
                </div>
                {/* New COD option */}
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <Radio value="cod" id="cod" className="mr-2" />
                  <label htmlFor="cod" className="flex-1 text-sm">
                    Cash on Delivery (COD)
                  </label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Coupon Card */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="h-5 w-5" />
                <h2 className="font-semibold text-sm">Apply Coupon</h2>
              </div>
              <Button
                className="w-full text-white"
                sx={{
                  backgroundColor: "#000",
                  "&:hover": { backgroundColor: "#333" },
                  color: "#fff",
                }}
                size="large"
              >
                Apply Coupon
              </Button>
            </CardContent>
          </Card>

          {/* Order Summary Card */}
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-3 text-sm">Order Summary</h2>

              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div className="flex justify-between text-sm" key={item.id}>
                    <span>
                      {item.name} ({item.quantity})
                    </span>
                    <span>₹{item.price}.00</span>
                  </div>
                ))}

                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{calculateTotalPrice()}.00</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Total Discount</span>
                    <span>-₹0.00</span>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-sm">
                    <span>Total</span>
                    <span>₹{calculateTotalPrice()}.00</span>
                  </div>
                </div>

                <Button
                onClick={HandleOrder}
                  className="w-full text-white"
                  sx={{
                    backgroundColor: "#000",
                    "&:hover": { backgroundColor: "#333" },
                    color: "#fff",
                  }}
                  size="large"
                >
                  Place Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default NewOrderPayment;
