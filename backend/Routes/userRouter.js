import express from "express";
const userRouter = express.Router()
import {Register, ResendOtp, VerifyOtp, Login, } from "../Controllers/User/AuthController.js";


userRouter.post('/register',Register)
userRouter.post('/verifyOtp',VerifyOtp)
userRouter.post('/resendOtp',ResendOtp)
userRouter.post('/login', Login)



export default userRouter