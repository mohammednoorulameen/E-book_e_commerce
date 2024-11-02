import React from "react";
import SignupPage from "../Pages/User/SignupPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/User/LoginPage";
import HomePage from "../Pages/User/HomePage";
import OtpPage from "../Pages/User/OtpPage";
import PublicRoute from "../Redux/Protector/PublicRoute.jsx";

const UserRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route path="/verifyotp/:userId" element={<OtpPage />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        
      </Routes>
    </div>
  );
};

export default UserRouter;
