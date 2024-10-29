import React from 'react'

const Header = () => {
  return (
    <div>
  <nav class="bg-white shadow-sm py-3 px-4">
    <div class="container mx-auto flex items-center justify-between">
        {/* <!-- Logo --> */}
        <div class="flex items-center space-x-4">
            <a href="#" class="text-xl font-bold text-blue-600">BrandLogo</a>
        </div>

        {/* <!-- Search Bar --> */}
        <div class="flex-grow mx-4">
            <input 
                type="text" 
                placeholder="Search for products" 
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        {/* <!-- Icons (Cart, Wishlist, Account) --> */}
        <div class="flex items-center space-x-6">
            <a href="#" class="text-gray-600 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m-1.4 8h16v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2z"/>
                </svg>
            </a>
            <a href="#" class="text-gray-600 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 4a4 4 0 00-8 0 4 4 0 108 0zM4 21v-2a6 6 0 0112 0v2H4z"/>
                </svg>
            </a>
            <a href="#" class="text-gray-600 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21c1.654 0 3-.671 3-1.5S13.654 18 12 18s-3 .671-3 1.5S10.346 21 12 21zm-4.314-3H2V5h8V3H1.5A1.5 1.5 0 000 4.5v12A1.5 1.5 0 001.5 18h6.186z"/>
                </svg>
            </a>
        </div>
    </div>
</nav>

{/* <!-- Second Navbar (Tabs) --> */}
<nav class="bg-blue-600 text-white py-2">
    <div class="container mx-auto flex items-center space-x-4">
        <a href="#" class="py-2 px-4 hover:bg-blue-700 rounded-lg">Home</a>
        <a href="#" class="py-2 px-4 hover:bg-blue-700 rounded-lg">Shop</a>
        <a href="#" class="py-2 px-4 hover:bg-blue-700 rounded-lg">Categories</a>
        <a href="#" class="py-2 px-4 hover:bg-blue-700 rounded-lg">Offers</a>
        <a href="#" class="py-2 px-4 hover:bg-blue-700 rounded-lg">Contact</a>
    </div>
</nav>
    </div>
  )
}

export default Header