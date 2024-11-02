import express from "express";
const userRouter = express.Router()
import {register, ResendOtp, verifyOtp} from "../Controllers/User/AuthController.js";


userRouter.post('/register',register)
userRouter.post('/verifyOtp',verifyOtp)
userRouter.post('/resendOtp',ResendOtp)



export default userRouter