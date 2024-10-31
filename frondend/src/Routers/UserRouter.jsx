import React from 'react'
import SignupPage from '../Pages/User/SignupPage'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../Pages/User/LoginPage'
import HomePage from '../Pages/User/HomePage'
import OtpPage from '../Pages/User/OtpPage'

const UserRouter = () => {
  return (
    <div>
        <Routes>
            <Route path='/register' element={<SignupPage/>} />
            <Route path='/verifyotp/:userId' element={<OtpPage/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/home' element={<HomePage/>} />
        </Routes>
    </div>
  )
}

export default UserRouter