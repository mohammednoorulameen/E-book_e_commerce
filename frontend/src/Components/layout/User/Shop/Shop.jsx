// I'm using plain react and don't use shadcn, use custom components, and use javascript for development.
// import React from 'react'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery, } from "../../../../Services/Apis/UserApi";

const Shop = () => {

  // const [activeTab, setActiveTab] = useState("products");
  const navigate = useNavigate()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, refetch } = useGetProductsQuery({
    page: currentPage,
    limit: 10,
  });

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return <p>Failed to load products. Please try again later.</p>;
  }

  const { products, totalPage } = data;
console.log(products)

const handleProduct = (id) =>{
  navigate(`/productdetails/${id}`)
}
  return (
    <div>
    
       <aside
      className={`fixed left-0 top-[64px] z-20 h-[calc(100vh-64px)] w-64 transform overflow-y-auto bg-white shadow-lg transition-transform duration-300 ease-in-out ${
        isFilterOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4">
        <h2 className="mb-4 text-lg font-semibold">Filter Products</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Category</h3>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Fiction
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Non-fiction
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Journal
            </label>
          </div>
          <div>
            <h3 className="font-medium">Price Range</h3>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              ₹0 - ₹500
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              ₹5000 - ₹1000
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              ₹1,000+
            </label>
          </div>
        </div>
      </div>
    </aside>

    
    <main className={`flex-grow transition-all duration-300 ${isFilterOpen ? 'ml-64' : 'ml-0'}`}>
      <div className="container mx-auto px-4 py-8">
       
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="mb-4 flex items-center gap-2 rounded bg-black px-4 py-2 text-white"
        >
          {/* <Filter size={20} /> */}
          {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
        </button>

       
        <div  className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            // const totalStars=product.review.reduce((acc,obj)=>acc+obj.star,0)
            // const avgStar=Math.round(totalStars/product.review.length)
            return(
            <div key={product._id} onClick={()=>handleProduct(product._id)} className="rounded-lg bg-white p-3 shadow cursor-pointer">
              <img
                src={product.images[0]}
                alt={product.productName}
                className="mb-2 h-32 w-full object-contain"
              />
              <div className="mx-1 flex">
              </div>
              <div className='flex justify-between py-3'>
              <h2 className="text-sm font-semibold">{product.productName}</h2>
              <p className="text-xs text-gray-600">{product.category} book</p>
              </div>
              <div className='flex justify-between'>
              <p className="text-xs text-gray-600">Author:{product.author} </p>
              <p className="text-sm font-bold">₹{product.price}</p>
              </div>
            </div>
          )})}
        </div>

        
        <div className="mt-8 flex items-center justify-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded bg-[#374151] px-3 py-1 text-white disabled:opacity-50"
          >
            {/* <ChevronLeft size={20} />  */}
          </button>
        
          <span>{`Page ${currentPage} of ${data?.totalPages || 1}`}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, data?.totalPages))}
            disabled={currentPage === data?.totalPages}
            className="rounded bg-[#374151] px-3 py-1 text-white disabled:opacity-50"
          >
            {/* <ChevronRight size={20} /> */}
          </button>
        </div>
      </div>
    </main>
  </div>

  )
}


export default Shop;
