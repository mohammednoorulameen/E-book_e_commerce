import React from 'react'
import { Card, CardContent, CardHeader } from "@mui/material";
import { Button, Typography } from "@mui/material";

const OrderHistory = () => {
  return (
    <div>
       <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Order History</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((order) => (
          <Card key={order}>
            <CardHeader>
              <Typography>Order #{order.toString().padStart(5, '0')}</Typography>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Placed on: {new Date().toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">Total: $99.99</p>
              <p className="text-sm text-gray-500">Status: Delivered</p>
              <Button className="mt-4" variant="outline">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </div>
  )
}

export default OrderHistory