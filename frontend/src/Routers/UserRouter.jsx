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
import CartPage from '../Pages/User/CartPage'
import {
  AccountPage,
  EditProfilePage,
  ChangePasswordPage,
  ManageAddressPage,
  OrderHistoryPage,
  SettingsPage,
  WalletPage,
  ReferralsPage,
  NotificationsPage
} from "../Pages/User/AccountPage";
import UserPrivate from "../Utils/Protector/UserPrivate";
import ForgotPasswordPage from "../Pages/User/ForgotPasswordPage";
import CheckOutPage from "../Pages/User/CheckOutPage";
import NewOrderPaymentPage from "../Pages/User/PaymentsPage";
import { elements } from "chart.js";
import WhishlistPage from "../Pages/User/WhishlistPage";


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
            {/* //{" "} */}
          </UserAuthenticated>
        ),
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />
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
          {
            path:'wallet',
            element: < WalletPage/>
          },
          {
            path:'referrals',
            element: < ReferralsPage/>
          },
          {
            path:'notifications',
            element: <NotificationsPage/>
          },
           {
            path:'settings',
            element: < SettingsPage/>
          }
        ],
      },

      {
        path: "/cart",
        element: <UserPrivate>
          <CartPage/>
        </UserPrivate>
      },

      {
        path:"/check-out",
        element: <CheckOutPage/>

      },

      {
        path:"/new-order-payment",
        element: <NewOrderPaymentPage/>
      },

      {
        path: "/whishlist",
        element : <WhishlistPage/>
      }

    ],
  },
];

export default UserRouter;
