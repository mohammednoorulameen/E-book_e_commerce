import React, { useState } from 'react';

const Otp = () => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP Submitted:", otp);
    // Add OTP verification logic here
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Verify Your Email
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Please enter the OTP sent to your email to verify your account.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          {/* OTP Input */}
          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="text-center p-3 text-2xl tracking-widest w-2/3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="123456"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Verify
          </button>
        </form>

        {/* Resend Link */}
        <div className="text-center mt-4 text-sm text-gray-600">
          Didn't receive the OTP?{" "}
          <button className="text-blue-500 hover:underline">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
