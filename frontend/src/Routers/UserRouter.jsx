import React from "react";
import SignupPage from "../Pages/User/SignupPage";
import LoginPage from "../Pages/User/LoginPage";
import HomePage from "../Pages/User/HomePage";
import Header from "../Components/Common/Header";
import { Outlet } from "react-router-dom";
import OtpPage from "../Pages/User/OtpPage";
import PublicRoute from "../Utils/Protector/PublicRoute";
import Footer from "../Components/Common/Footer";



const UserRouter=[
  {
    path:'/',
    element:(
      <>
      <Header/>

      <Outlet/>
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
