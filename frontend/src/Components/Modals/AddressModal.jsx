import React from 'react'
import Modal from 'react-modal'; 
// import { XIcon } from '@heroicons/react/outline';


const AddressModal = ({ isOpen, onClose, mode, loading, errorMessages }) => {
  return (
    <div>
        <Modal
  isOpen={isOpen}
  onRequestClose={onClose}
  className="modal-content fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50"
  overlayClassName="modal-overlay fixed z-50 inset-0"
>
  <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-auto p-6">
    <div className="flex justify-between items-center border-b pb-4">
      <h2 className="text-2xl font-bold text-gray-800">
        {mode ? 'Edit Address' : 'Add New Address'}
      </h2>
      <button
        disabled={loading}
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        {/* <XIcon className="h-6 w-6" /> */}
      </button>
    </div>

    {/* {error && (
      <div className="bg-red-100 border border-red-400 text-red-600 rounded-md p-2 mt-4">
        <p>{error}</p>
      </div>
    )} */}
<form className="space-y-4 mt-6 bg-white p-4 rounded-lg shadow-lg max-w-lg mx-auto">
  <div>
    <label htmlFor="addressName" className="block text-sm font-semibold text-gray-700">
      Address Name
    </label>
    <input
      type="text"
      id="addressName"
      name="addressName"
      placeholder="e.g., Home, Work"
      className="mt-1 w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    {errorMessages?.addressName && (
      <p className="text-red-500 text-xs mt-1">{errorMessages.addressName}</p>
    )}
  </div>

  <div>
    <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
      Name
    </label>
    <input
      type="text"
      id="name"
      name="name"
      placeholder="Full Name"
      className="mt-1 w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  <div>
    <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700">
      Phone Number
    </label>
    <input
      type="number"
      id="phoneNumber"
      name="phoneNumber"
      placeholder="Phone Number"
      className="mt-1 w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  <div>
    <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
      Address
    </label>
    <textarea
      id="address"
      name="address"
      placeholder="House No, Building, Street, Area"
      rows={2}
      className="mt-1 w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div>
      <label htmlFor="city" className="block text-sm font-semibold text-gray-700">
        City
      </label>
      <input
        type="text"
        id="city"
        name="city"
        placeholder="City"
        className="mt-1 w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="state" className="block text-sm font-semibold text-gray-700">
        State
      </label>
      <input
        type="text"
        id="state"
        name="state"
        placeholder="State"
        className="mt-1 w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>

  <div>
    <label htmlFor="postalCode" className="block text-sm font-semibold text-gray-700">
      Postal Code
    </label>
    <input
      type="number"
      id="postalCode"
      name="postalCode"
      placeholder="Postal Code"
      className="mt-1 w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  <div className="flex items-center space-x-2 mt-4">
    <input
      type="checkbox"
      id="isDefault"
      name="isDefault"
      className="h-4 w-4 text-blue-500 focus:ring-2 focus:ring-blue-500 border-gray-300 rounded"
    />
    <label htmlFor="isDefault" className="text-sm font-semibold text-gray-700">
      Set as Default Address
    </label>
  </div>

  <button
    type="submit"
    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
  >
    Save Address
  </button>
</form>


  </div>
</Modal>

    </div>
  )
}

export default AddressModal