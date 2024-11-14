import React from "react";
import SignupPage from "../Pages/User/SignupPage";
import LoginPage from "../Pages/User/LoginPage";
import HomePage from "../Pages/User/HomePage";
import Header from "../Components/Common/Header";
import { Outlet } from "react-router-dom";
import OtpPage from "../Pages/User/OtpPage";
import Footer from "../Components/Common/Footer";
import ShopPage from "../Pages/User/ShopPage";
import ProductDetailsPage from "../Pages/User/ProductDetailsPage";
import UserAuthenticated from "../Utils/Protector/UserAuthenticated";



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
        <UserAuthenticated>
           <SignupPage/>
           </UserAuthenticated>
      },

      {
        path: "/verifyotp/:userId",
        element:
        <UserAuthenticated>
         <OtpPage/>
        </UserAuthenticated>

      },

      {
        path : "/login",
        element:
        <UserAuthenticated>
         <LoginPage/>
        // </UserAuthenticated>

      },

      {
        path : "/shop",
        element:
        // <PublicRoute>
         <ShopPage/>
        // </PublicRoute>

      },

      {
        path : "/productdetails/:product_id",
        element:
        // <PublicRoute>
         <ProductDetailsPage/>
        // </PublicRoute>

      },
      
      
    ]
  }
]


export default UserRouter
