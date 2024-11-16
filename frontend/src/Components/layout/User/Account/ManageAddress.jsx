import React, { useState } from 'react';
import { Card, CardContent, CardHeader, IconButton, Button, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import AddressModal from '../../../Modals/AddressModal'

const ManageAddress = () => {

  const [isModalOpen, setIsModalOpen]  = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Manage Addresses</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader
            title={<Typography>Home Address</Typography>}
            action={
              <IconButton aria-label="delete" color="error">
                <Delete />
              </IconButton>
            }
          />
          <CardContent>
            <p>123 Main St</p>
            <p>Anytown, ST 12345</p>
            <p>United States</p>
            <Button 
              variant="outlined" 
              sx={{ marginTop: '20px', paddingTop: '10px' }}
            >
              Edit
            </Button>
          </CardContent>
        </Card>
      </div>
      {/* <Button variant="contained" color="primary">Add New Address</Button> */}
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Add New Address
      </Button>
       {/* Modal Component */}
       <AddressModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ManageAddress;

