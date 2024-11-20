import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Typography,
} from "@mui/material";
import { CalendarToday, LocationOn, LocalShipping } from "@mui/icons-material";
import { useOrdersListQuery } from "../../../../Services/Apis/AdminApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminOrdersDetailes = () => {
  const { userId } = useParams();
  const { data, isLoading, isError, refetch } = useOrdersListQuery({});
  const [user, setUser] = useState();
  const orderItems = data?.orderItems;

  console.log("data", data);
  console.log("user", userId);

  useEffect(() => {
    if (orderItems) {
      orderItems.map((order) => {
        const oderUserId = order.userDetails._id;
        if (userId === oderUserId) {
          const transformedItems =
            (userId,
            {
              id: userId,
              email: order.userDetails.email,
              username: order.userDetails.username,
              status: order.items.orderStatus,
              quantity: order.items.quantity,
              price: order.items.price,
              orderId: order.items._id,
              productName : order.productDetails.productName,
              productImage : order.productDetails.images[0]  || "https://via.placeholder.com/100", 
            });
          setUser(transformedItems);
        }
      });
    }
  }, [orderItems]);

  console.log("user", user);
  return (
    <div className="min-h-screen bg-background p-4 mt-7">
      {user && (
        <Card sx={{ maxWidth: 1200, mx: "auto" }}>
          <CardHeader
            action={
              <div className="flex items-center gap-4">
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select defaultValue="pending" label="Status">
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="processing">Processing</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="contained">Save</Button>
              </div>
            }
            title={
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CalendarToday fontSize="small" />
                  <span className="text-sm text-muted-foreground">
                    Wed, Aug 13, 2022, 4:34PM
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Order ID: {user.orderId}
                </div>
              </div>
            }
          />
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-4">
                <Typography variant="h6">Customer</Typography>
                <div>
                  <div className="font-medium">{user.username}</div>
                  <div className="text-sm text-muted-foreground">
                    {user.email}{" "}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Typography variant="h6">Order Info</Typography>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <LocalShipping fontSize="small" color="disabled" />
                    <span>Shipping: Fargo express</span>
                  </div>
                  <div>Pay method: Razorpay</div>
                  <div>Payment Status: Paid</div>
                </div>
              </div>
              <div className="space-y-4">
                <Typography variant="h6">Deliver to</Typography>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <LocationOn fontSize="small" color="disabled" />
                    <span>City: sdfas, sdfasq</span>
                  </div>
                  <div>asdxc,</div>
                  <div>Po Box</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">Product</th>
                    <th className="px-4 py-3 text-right">Unit Price</th>
                    <th className="px-4 py-3 text-right">Quantity</th>
                    <th className="px-4 py-3 text-right">Total</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-4">
                        <img
                          alt="Product image"
                          className="h-16 w-16 rounded-lg border object-cover"
                          src={user.productImage}
                        />

              <span>{user.productName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">{user.price}</td>
                    <td className="px-4 py-3 text-right">{user.quantity}</td>
                    <td className="px-4 py-3 text-right">{user.price}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>

          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Typography variant="body2" className="font-medium">
                  Subtotal:
                </Typography>
                <Typography variant="body2">11199</Typography>
              </div>
              <div className="flex justify-between">
                <Typography variant="body2" className="font-medium">
                  Shipping cost:
                </Typography>
                <Typography variant="body2" sx={{ color: "green" }}>
                  Free Shipping
                </Typography>
              </div>
              <div className="flex justify-between">
                <Typography variant="body2" className="font-medium">
                  Grand total:
                </Typography>
                <Typography variant="body2">11199</Typography>
              </div>
              <div className="flex justify-between">
                <Typography variant="body2" className="font-medium">
                  Status:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    borderRadius: "9999px",
                    bgcolor: "orange.100",
                    px: 2,
                    py: 0.5,
                    fontSize: "0.75rem",
                    color: "orange.600",
                  }}
                >
                  {user.status}
                </Typography>
              </div>
            </div>
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default AdminOrdersDetailes;
