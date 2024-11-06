import React, { useState } from 'react';
import { FaSearch, FaBell, FaFileExport, FaFileImport, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

const ProductManagement = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    { id: 1, name: 'Laptop Pro', sku: 'LP-001', category: 'Electronics', price: '$1299.99', stock: 50, status: 'In Stock' },
    { id: 2, name: 'Wireless Mouse', sku: 'WM-002', category: 'Accessories', price: '$29.99', stock: 100, status: 'In Stock' },
    { id: 3, name: 'HD Monitor', sku: 'HM-003', category: 'Electronics', price: '$199.99', stock: 30, status: 'Low Stock' },
    { id: 4, name: 'Mechanical Keyboard', sku: 'MK-004', category: 'Accessories', price: '$89.99', stock: 0, status: 'Out of Stock' },
    { id: 5, name: 'Noise-Canceling Headphones', sku: 'NCH-005', category: 'Audio', price: '$249.99', stock: 75, status: 'In Stock' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-4 border-b mb-6">
          <button
            className={`pb-4 px-2 ${activeTab === 'products' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button
            className={`pb-4 px-2 ${activeTab === 'categories' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Products</h2>
          <div className="flex gap-3">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Add new product
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <FaFileImport />
              Import products
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <FaFileExport />
              Export products (Excel)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-6">Product name</th>
                <th className="text-left py-4 px-6">SKU</th>
                <th className="text-left py-4 px-6">Category</th>
                <th className="text-left py-4 px-6">Price</th>
                <th className="text-left py-4 px-6">Stock</th>
                <th className="text-left py-4 px-6">Status</th>
                <th className="text-left py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="py-4 px-6">{product.name}</td>
                  <td className="py-4 px-6">{product.sku}</td>
                  <td className="py-4 px-6">{product.category}</td>
                  <td className="py-4 px-6">{product.price}</td>
                  <td className="py-4 px-6">{product.stock}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      product.status === 'In Stock' 
                        ? 'bg-green-100 text-green-800'
                        : product.status === 'Low Stock'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="text-gray-600 hover:text-indigo-600">
                        <FaPencilAlt className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-red-600">
                        <FaTrashAlt className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;