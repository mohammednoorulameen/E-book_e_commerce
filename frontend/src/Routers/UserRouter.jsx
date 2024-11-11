import React from "react";
import SignupPage from "../Pages/User/SignupPage";
import LoginPage from "../Pages/User/LoginPage";
import HomePage from "../Pages/User/HomePage";
import Header from "../Components/Common/Header";
import { Outlet } from "react-router-dom";
import OtpPage from "../Pages/User/OtpPage";
import PublicRoute from "../Utils/Protector/PublicRoute";
import Footer from "../Components/Common/Footer";
import ShopPage from "../Pages/User/ShopPage";
import ProductDetailsPage from "../Pages/User/ProductDetailsPage";



const UserRouter=[
  {
    path:'/',
    element:(
      <>
      <Header/>

      <div style={{paddingTop :"100px"}}>
      <Outlet />
      </div>
      
      <Footer/>
      </>
    ),

    children:[
      {
        path:'',
        element:<HomePage/>
      },

      {
        path:'register',
        element: 
        <PublicRoute>
           <SignupPage/>
           </PublicRoute>
      },

      {
        path: "/verifyotp/:userId",
        element:
        <PublicRoute>
         <OtpPage/>
        </PublicRoute>

      },

      {
        path : "/login",
        element:
        <PublicRoute>
         <LoginPage/>
        </PublicRoute>

      },

      {
        path : "/shop",
        element:
        <PublicRoute>
         <ShopPage/>
        </PublicRoute>

      },

      {
        path : "/productdetails/:product_id",
        element:
        <PublicRoute>
         <ProductDetailsPage/>
        </PublicRoute>

      },
      
      
    ]
  }
]


export default UserRouter

// const UserRouter = () => {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route
//           path="/register"
//           element={
//             <PublicRoute>
//               <SignupPage />
//             </PublicRoute>
//           }
//         />
//         <Route path="/verifyotp/:userId" element={<OtpPage />} />
//         <Route
//           path="/login"
//           element={
//             <PublicRoute>
//               <LoginPage />
//             </PublicRoute>
//           }
//         />
        
//       </Routes>
//     </div>
//   );
// };

// export default UserRouter;
