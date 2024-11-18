// import {
//     Card,
//     CardContent,
//     Button,
//     Radio,
//     RadioGroup,
//   } from "@mui/material";
  
//   import {
//     Tag,
//     Truck,
//     Wallet,
//   } from "lucide-react";
  
//   export default function Component() {
//     return (
//       <div className="min-h-screen bg-background">
//         <main className="container mx-auto px-4 py-8">
//           <h1 className="text-2xl text-center font-bold mb-8">Complete Your Order</h1>
//           <div className="max-w-2xl mx-auto">
//             <Card className="mb-6">
//               <CardContent className="p-6">
//                 <div className="flex items-center gap-2 mb-4">
//                   <Truck className="h-5 w-5" />
//                   <h2 className="font-semibold">Shipping Address</h2>
//                 </div>
//                 <div className="space-y-1 text-sm">
//                   <p>sfdgvnb</p>
//                   <p className="text-muted-foreground">qwe, cdc</p>
//                 </div>
//               </CardContent>
//             </Card>
  
//             <Card className="mb-6">
//               <CardContent className="p-6">
//                 <h2 className="font-semibold mb-4">Payment Method</h2>
//                 <RadioGroup defaultValue="razorpay" className="space-y-3">
//                   <div className="flex items-center space-x-2 border rounded-lg p-4 bg-blue-50">
//                     <Radio value="razorpay" id="razorpay" className="mr-2" />
//                     <label htmlFor="razorpay" className="flex-1">Razor Pay</label>
//                   </div>
//                   <div className="flex items-center space-x-2 border rounded-lg p-4">
//                     <Radio value="wallet" id="wallet" className="mr-2" />
//                     <label htmlFor="wallet" className="flex-1 flex justify-between">
//                       <span className="flex items-center gap-2">
//                         <Wallet className="h-4 w-4" />
//                         Wallet
//                       </span>
//                       <span className="text-sm text-muted-foreground">Balance Amount: ₹0.00</span>
//                     </label>
//                   </div>
//                 </RadioGroup>
//               </CardContent>
//             </Card>
  
//             <Card className="mb-6">
//               <CardContent className="p-6">
//                 <div className="flex items-center gap-2 mb-4">
//                   <Tag className="h-5 w-5" />
//                   <h2 className="font-semibold">Apply Coupon</h2>
//                 </div>
//                 <Button
//                   className="w-full"
//                   sx={{
//                     backgroundColor: "#000", 
//                     "&:hover": { backgroundColor: "#333" },
//                     color:"#fff"

//                   }}
//                   size="large"
//                 >
//                   Apply Coupon
//                 </Button>
//               </CardContent>
//             </Card>
  
//             <Card>
//               <CardContent className="p-6">
//                 <h2 className="font-semibold mb-4">Order Summary</h2>
//                 <div className="space-y-4">
//                   <div className="flex justify-between">
//                     <span>Groove 2561 (x3)</span>
//                     <span>₹125250.00</span>
//                   </div>
//                   <div className="border-t pt-4 space-y-2">
//                     <div className="flex justify-between">
//                       <span>Subtotal</span>
//                       <span>₹125250.00</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Shipping</span>
//                       <span>₹50.00</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Tax</span>
//                       <span>₹2505.00</span>
//                     </div>
//                     <div className="flex justify-between text-green-600">
//                       <span>Total Discount</span>
//                       <span>-₹0.00</span>
//                     </div>
//                   </div>
//                   <div className="border-t pt-4">
//                     <div className="flex justify-between font-semibold">
//                       <span>Total</span>
//                       <span>₹127805.00</span>
//                     </div>
//                   </div>
//                   <Button
//                     className="w-full text-white"
//                     sx={{
//                       backgroundColor: "#000", 
//                       "&:hover": { backgroundColor: "#333" },
//                       color:"#fff"
//                     }}
//                     size="large"
//                   >
//                     Place Order
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     );
//   }
  

import {
    Card,
    CardContent,
    Button,
    Radio,
    RadioGroup,
  } from "@mui/material";
  
  import {
    Tag,
    Truck,
    Wallet,
  } from "lucide-react";
  
  export default function Component() {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-4">
          <h1 className="text-xl text-center font-bold mb-6">Complete Your Order</h1>
          <div className="max-w-2xl mx-auto">
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Truck className="h-5 w-5" />
                  <h2 className="font-semibold text-sm">Shipping Address</h2>
                </div>
                <div className="space-y-1 text-sm">
                  <p>sfdgvnb</p>
                  <p className="text-muted-foreground">qwe, cdc</p>
                </div>
              </CardContent>
            </Card>
  
            <Card className="mb-4">
              <CardContent className="p-4">
                <h2 className="font-semibold mb-3 text-sm">Payment Method</h2>
                <RadioGroup defaultValue="razorpay" className="space-y-2">
                  <div className="flex items-center space-x-2 border rounded-lg p-3 bg-blue-50">
                    <Radio value="razorpay" id="razorpay" className="mr-2" />
                    <label htmlFor="razorpay" className="flex-1 text-sm">Razor Pay</label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                    <Radio value="wallet" id="wallet" className="mr-2" />
                    <label htmlFor="wallet" className="flex-1 flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Wallet className="h-4 w-4" />
                        Wallet
                      </span>
                      <span className="text-xs text-muted-foreground">Balance Amount: ₹0.00</span>
                    </label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
  
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
                                        color:"#fff"
                                      }}
                                      size="large"
                >
                  Apply Coupon
                </Button>
              </CardContent>
            </Card>
  
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold mb-3 text-sm">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Groove 2561 (x3)</span>
                    <span>₹125250.00</span>
                  </div>
                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹125250.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>₹50.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>₹2505.00</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Total Discount</span>
                      <span>-₹0.00</span>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-sm">
                      <span>Total</span>
                      <span>₹127805.00</span>
                    </div>
                  </div>
                  <Button
                className="w-full text-white"
                                    sx={{
                                      backgroundColor: "#000", 
                                      "&:hover": { backgroundColor: "#333" },
                                      color:"#fff"
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
  }
  