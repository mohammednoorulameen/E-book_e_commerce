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
import {
  AccountPage,
  EditProfilePage,
  ChangePasswordPage,
  ManageAddressPage,
  OrderHistoryPage,
  SettingsPage
} from "../Pages/User/AccountPage";
import UserPrivate from "../Utils/Protector/UserPrivate";

const UserRouter = [
  {
    path: "/",
    element: (
      <>
        <Header />

        <div style={{ paddingTop: "150px" }}>
          <Outlet />
        </div>

        <Footer />
      </>
    ),

    children: [
      {
        path: "",
        element: <HomePage />,
      },

      {
        path: "register",
        element: (
          <UserAuthenticated>
            <SignupPage />
          </UserAuthenticated>
        ),
      },

      {
        path: "/verifyotp/:userId",
        element: (
          <UserAuthenticated>
            <OtpPage />
          </UserAuthenticated>
        ),
      },

      {
        path: "/login",
        element: (
          <UserAuthenticated>
            <LoginPage />
            //{" "}
          </UserAuthenticated>
        ),
      },

      {
        path: "/shop",
        element: <ShopPage />,
      },

      {
        path: "/productdetails/:product_id",
        element: <ProductDetailsPage />,
      },

      {
        path: "/account",
        element: (
          <UserPrivate>
            {" "}
            <AccountPage />{" "}
          </UserPrivate>
        ),
        children: [
          {
            path: "edit-profile",
            element: <EditProfilePage />,
          },
          {
            path: "change-password",
            element: <ChangePasswordPage />,
          },
          {
            path: "manage-address",
            element: <ManageAddressPage />,
          },
          {
            path: "orders",
            element: <OrderHistoryPage />,
          },
          // {
          //   path:'Wallet',
          //   element: < Wallet/>
          // },
          // {
          //   path:'referals',
          //   element: < Referals/>
          // },
           {
            path:'settings',
            element: < SettingsPage/>
          }
        ],
      },
    ],
  },
];

export default UserRouter;
