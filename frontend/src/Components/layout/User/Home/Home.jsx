import React from 'react';
import { FaStar, FaShoppingCart, FaHeart, FaChevronLeft, FaChevronRight, FaSearch, FaUser, FaBars } from 'react-icons/fa';

// Custom Button Component
const Button = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded ${className}`}
    style={{ cursor: 'pointer', transition: 'background-color 0.3s' }}
  >
    {children}
  </button>
);

// Custom Input Component
const Input = ({ type, placeholder, className }) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`border rounded px-3 py-2 ${className}`}
    style={{ width: '100%' }}
  />
);

const BookCard = ({ title, author, price }) => (
  <div style={{ position: 'relative', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}>
    <div style={{ aspectRatio: '3/4', backgroundColor: '#f7fafc', borderRadius: '0.5rem', marginBottom: '1rem' }}>
      <img src="/placeholder.svg" alt="Book cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
    <h3 style={{ fontWeight: 'bold' }}>{title}</h3>
    <p style={{ color: '#718096', fontSize: '0.875rem' }}>{author}</p>
    <div style={{ display: 'flex', gap: '0.25rem', margin: '0.5rem 0' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar key={star} style={{ color: '#f6ad55' }} />
      ))}
    </div>
    <p style={{ fontWeight: 'bold' }}>{price}</p>
    <p style={{ fontSize: '0.75rem', color: '#718096' }}>Free Delivery</p>
    <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
     

      {/* Hero Section */}
      <section style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
        <img src="/placeholder.svg" alt="Books banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>TOP DEAL TODAY!</h1>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>BOOKS</h2>
            <Button className="bg-white text-black hover:bg-gray-100">
              SHOP NOW
            </Button>
          </div>
        </div>
      </section>

      {/* Super Saver Section */}
      <section style={{ padding: '3rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ borderBottom: '2px solid #3182ce', paddingBottom: '0.5rem' }}>Super Saver</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[1, 2, 3, 4].map((item) => (
              <BookCard key={item} title="The White Tiger" author="Aravind Adiga" price="INR 999/-" />
            ))}
          </div>
        </div>
      </section>

      {/* New Books Section */}
      <section style={{ padding: '3rem 0', backgroundColor: '#f7fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>
            NEW BOOKS TOP DEAL
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[1, 2, 3, 4].map((item) => (
              <BookCard key={item} title="The White Tiger" author="Aravind Adiga" price="INR 999/-" />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Authors */}
      <section style={{ padding: '3rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>
            FEATURED AUTHOR
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
            {[1, 2, 3, 4, 5, 6].map((author) => (
              <div key={author} style={{ textAlign: 'center' }}>
                <div style={{ width: '6rem', height: '6rem', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#e2e8f0', marginBottom: '0.5rem' }}>
                  <img src="/placeholder.svg" alt="Author" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>Author Name</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}