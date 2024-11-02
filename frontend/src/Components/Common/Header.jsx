// import React from 'react'

// import { FaStar, FaShoppingCart, FaHeart, FaChevronLeft, FaChevronRight, FaSearch, FaUser, FaBars } from 'react-icons/fa';
// const Button = ({ children, onClick, className }) => (
//     <button
//       onClick={onClick}
//       className={`px-4 py-2 rounded ${className}`}
//       style={{ cursor: 'pointer', transition: 'background-color 0.3s' }}
//     >
//       {children}
//     </button>
//   );
  
//   // Custom Input Component
//   const Input = ({ type, placeholder, className }) => (
//     <input
//       type={type}
//       placeholder={placeholder}
//       className={`border rounded px-3 py-2 ${className}`}
//       style={{ width: '100%' }}
//     />
//   );
// const Header = () => {
//   return (
//     <div>
//    {/* Header */}
//    <header style={{ borderBottom: '1px solid #e2e8f0', padding: '1rem 0' }}>
//         <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
//             <span style={{ color: '#3182ce' }}>E</span>-book
//           </div>
//           <div style={{ flex: 1, maxWidth: '36rem', margin: '0 1rem', position: 'relative', display: 'none' }}>
//             <Input type="search" placeholder="Search for your favorite book..." />
//             <FaSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#718096' }} />
//           </div>
//           <div style={{ display: 'flex', gap: '1rem' }}>
//             <Button className="bg-transparent hover:bg-gray-100"><FaUser /></Button>
//             <Button className="bg-transparent hover:bg-gray-100"><FaShoppingCart /></Button>
//             <Button className="bg-transparent hover:bg-gray-100"><FaHeart /></Button>
//             <Button className="bg-transparent hover:bg-gray-100 md:hidden"><FaBars /></Button>
//           </div>
//         </div>
//       </header>
//     </div>
//   )
// }

// export default Header

import React, { useState } from 'react';
import { FaSearch, FaUser, FaShoppingCart, FaHeart, FaEllipsisV, FaBook } from 'react-icons/fa';

const NavLink = ({ children, active }) => (
  <a
    href="#"
    style={{
      color: 'white',
      textDecoration: 'none',
      padding: '15px 20px',
      position: 'relative',
      display: 'inline-block',
      fontSize: '14px',
      fontWeight: '500',
      ...(active && {
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '2px',
          backgroundColor: '#007bff'
        }
      })
    }}
  >
    {children}
  </a>
);

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <header>
      {/* Top Bar */}
      <div style={{
        padding: '15px 20px',
        backgroundColor: 'white',
        borderBottom: '1px solid #eee',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            <FaBook />
            <span>E-book</span>
          </div>

          {/* Search Bar */}
          <form 
            onSubmit={handleSearch}
            style={{
              flex: 1,
              maxWidth: '600px',
              position: 'relative'
            }}
          >
            <input
              type="text"
              placeholder="Search for your boooks and more"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 40px 10px 15px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
            <button
              type="submit"
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              <FaSearch />
            </button>
          </form>

          {/* Right Icons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <a href="#" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              color: 'black',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              <FaUser />
              <span>Account</span>
            </a>
            <a href="#" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              color: 'black',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              <FaShoppingCart />
              <span>Cart</span>
            </a>
            <a href="#" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              color: 'black',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              <FaHeart />
              <span>WhishList</span>
            </a>
            <button style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#666',
              padding: '5px'
            }}>
              <FaEllipsisV />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav style={{
        backgroundColor: 'black',
        padding: '0 20px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px'
        }}>
          <NavLink>HOME</NavLink>
          <NavLink active>SHOP</NavLink>
          <NavLink>CATEGORIES</NavLink>
          <NavLink>AUTHORS</NavLink>
          <NavLink>CONTACT</NavLink>
          <NavLink>ABOUT US</NavLink>
        </div>
      </nav>
    </header>
  );
}