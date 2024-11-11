import React from 'react';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';

// Custom Button Component
const Button = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded transition-colors duration-300 ${className}`}
  >
    {children}
  </button>
);

// Custom Input Component
const Input = ({ type, placeholder, className }) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`border rounded px-3 py-2 w-full ${className}`}
  />
);

const BookCard = ({ title, author, price }) => (
  <div className="relative p-4 border border-gray-300 rounded-lg">
    <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4">
      <img src="/placeholder.svg" alt="Book cover" className="w-full h-full object-cover" />
    </div>
    <h3 className="font-bold">{title}</h3>
    <p className="text-gray-600 text-sm">{author}</p>
    <div className="flex gap-1 my-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar key={star} className="text-orange-400" />
      ))}
    </div>
    <p className="font-bold">{price}</p>
    <p className="text-xs text-gray-600">Free Delivery</p>
    <div className="absolute top-2 right-2 flex flex-col gap-2">
      <Button className="bg-gray-200 hover:bg-gray-300">
        <FaShoppingCart />
      </Button>
      <Button className="bg-gray-200 hover:bg-gray-300">
        <FaHeart />
      </Button>
    </div>
  </div>
);

export default function BookstoreHomepage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img src="https://t4.ftcdn.net/jpg/06/88/66/31/360_F_688663136_CYDZXf10utvUG7QScsByISc5AaEDf68F.jpg" alt="Books banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">TOP DEAL TODAY!</h1>
            <h2 className="text-2xl mb-6">BOOKS</h2>
            <Button className="bg-white text-black hover:bg-gray-100">
              SHOP NOW
            </Button>
          </div>
        </div>
      </section>

      {/* Super Saver Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 border-b-2 border-blue-600 inline-block pb-2">
            Super Saver
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <BookCard key={item} title="The White Tiger" author="Aravind Adiga" price="INR 999/-" />
            ))}
          </div>
        </div>
      </section>

      {/* New Books Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            NEW BOOKS TOP DEAL
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <BookCard key={item} title="The White Tiger" author="Aravind Adiga" price="INR 999/-" />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Authors */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            FEATURED AUTHOR
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[1, 2, 3, 4, 5, 6].map((author) => (
              <div key={author} className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-2">
                  <img src="/placeholder.svg" alt="Author" className="w-full h-full object-cover" />
                </div>
                <p className="text-sm font-medium">Author Name</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
