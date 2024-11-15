import React from 'react'
import { Card, CardContent, CardHeader } from "@mui/material";
import { Button, Typography } from "@mui/material";

const ManageAddress = () => {
  return (
    <div> <div className="space-y-6">
    <h2 className="text-2xl font-semibold text-gray-900">Manage Addresses</h2>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <Typography>Home Address</Typography>
        </CardHeader>
        <CardContent>
          <p>123 Main St</p>
          <p>Anytown, ST 12345</p>
          <p>United States</p>
          <Button className="mt-4" variant="outline">Edit</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Typography>Work Address</Typography>
        </CardHeader>
        <CardContent>
          <p>456 Office Blvd</p>
          <p>Workville, ST 67890</p>
          <p>United States</p>
          <Button className="mt-4" variant="outline">Edit</Button>
        </CardContent>
      </Card>
    </div>
    <Button>Add New Address</Button>
  </div></div>
  )
}

export default ManageAddress