// 'use client'

// import { useState } from 'react'
// import { ChevronRight } from 'lucide-react'

// export default function Component() {
//   const [gender, setGender] = useState('male')

//   return (
//     <div className="flex min-h-screen ml-28 bg-white">
//       {/* Sidebar */}
//       <div className="w-[280px] bg-white p-5 border border-gray-300 shadow-md">
//         <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
//           <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
//             👤
//           </div>
//           <span className="text-lg">Hello</span>
//         </div>

//         <nav className="space-y-1">
//           {/* My Orders */}
//           <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg gap-3">
//             <span className="w-5 h-5 text-blue-600">📦</span>
//             <span className="flex-1 text-left">MY ORDERS</span>
//             <ChevronRight className="w-4 h-4 text-gray-400" />
//           </button>

//           {/* Account Settings */}
//           <div>
//             <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg gap-3">
//               <span className="w-5 h-5 text-blue-600">👤</span>
//               <span className="flex-1 text-left">ACCOUNT SETTINGS</span>
//               <ChevronRight className="w-4 h-4 text-gray-400" />
//             </button>
//             <div className="ml-8 mt-1 space-y-1">
//               <button className="w-full px-3 py-2 text-blue-600 bg-blue-50 rounded-lg text-left text-sm">
//                 Profile Information
//               </button>
//               <button className="w-full px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-left text-sm">
//                 Manage Addresses
//               </button>
//               <button className="w-full px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-left text-sm">
//                 PAN Card Information
//               </button>
//             </div>
//           </div>

//           {/* Payments */}
//           <div>
//             <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg gap-3">
//               <span className="w-5 h-5 text-blue-600">💳</span>
//               <span className="flex-1 text-left">PAYMENTS</span>
//               <ChevronRight className="w-4 h-4 text-gray-400" />
//             </button>
//             <div className="ml-8 mt-1 space-y-1">
//               <button className="w-full px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-left text-sm flex justify-between items-center">
//                 Gift Cards
//                 <span className="text-green-600">₹0</span>
//               </button>
//               <button className="w-full px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-left text-sm">
//                 Saved UPI
//               </button>
//               <button className="w-full px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-left text-sm">
//                 Saved Cards
//               </button>
//             </div>
//           </div>

//           {/* My Stuff */}
//           <div>
//             <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg gap-3">
//               <span className="w-5 h-5 text-blue-600">🎁</span>
//               <span className="flex-1 text-left">MY STUFF</span>
//               <ChevronRight className="w-4 h-4 text-gray-400" />
//             </button>
//             <div className="ml-8 mt-1 space-y-1">
//               <button className="w-full px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-left text-sm">
//                 My Coupons
//               </button>
//               <button className="w-full px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-left text-sm">
//                 My Reviews & Ratings
//               </button>
//               <button className="w-full px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-left text-sm">
//                 All Notifications
//               </button>
//               <button className="w-full px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-left text-sm">
//                 My Wishlist
//               </button>
//             </div>
//           </div>

//           {/* Logout */}
//           <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg gap-3 mt-auto">
//             <span className="w-5 h-5 text-blue-600">🚪</span>
//             <span className="flex-1 text-left">Logout</span>
//           </button>
//         </nav>
//       </div>
//     </div>
//   )
// }
