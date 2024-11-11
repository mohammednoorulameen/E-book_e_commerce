import express from "express";
const userRouter = express.Router()
import {Register, ResendOtp, VerifyOtp, Login, } from "../Controllers/User/AuthController.js";
import { ProductDetails, ListProduct } from '../Controllers/User/UserProductController.js'
/**
 * GET
 */

userRouter.get('/Products-details',ProductDetails)
userRouter.get('/list-Products',ListProduct)
/**
 * POST
 */

userRouter.post('/register',Register)
userRouter.post('/verifyOtp',VerifyOtp)
userRouter.post('/resendOtp',ResendOtp)
userRouter.post('/login', Login)
// userRouter.get('/refresh'RefreshingToken)


export default userRouter