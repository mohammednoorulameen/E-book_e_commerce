import express from "express";
const userRouter = express.Router();
import {
  Register,
  ResendOtp,
  VerifyOtp,
  Login,
  UserProfile,
  Logout,
  RefreshingToken,
} from "../Controllers/User/UserController.js";
import {
  ProductDetails,
  ListProduct,
} from "../Controllers/User/UserProductController.js";
import { VerifyToken } from '../Middlewares/VerifyToken.js'
/**
 * GET
 */

userRouter.get("/Products-details", ProductDetails);
userRouter.get("/list-Products", ListProduct);
userRouter.get('/refresh-token',RefreshingToken)
userRouter.get("/userProfile", VerifyToken ,UserProfile);

/**
 * POST
 */

userRouter.post("/register", Register);
userRouter.post("/verifyOtp", VerifyOtp);
userRouter.post("/resendOtp", ResendOtp);
userRouter.post("/login", Login);
userRouter.post("/logout", Logout);

export default userRouter;
