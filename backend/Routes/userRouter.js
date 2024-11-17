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
  UserEditInfo,
  ChangePassword,
  AddAddress,
  GetAddress,
  EditAddress,
  DeleteAddress,
} from "../Controllers/User/UserController.js";
import {
  ProductDetails,
  ListProduct,
} from "../Controllers/User/UserProductController.js";
import { VerifyToken } from "../Middlewares/VerifyToken.js";
/**
 * GET
 */

userRouter.get("/Products-details", ProductDetails);
userRouter.get("/list-Products", ListProduct);
userRouter.get("/refresh-token", RefreshingToken);
userRouter.get("/userProfile", VerifyToken, UserProfile);
userRouter.get("/user-address", VerifyToken, GetAddress);

/**
 * POST
 */

userRouter.post("/register", Register);
userRouter.post("/verifyOtp", VerifyOtp);
userRouter.post("/resendOtp", ResendOtp);
userRouter.post("/login", Login);
userRouter.post("/logout", Logout);
userRouter.post("/edit-userInfo", VerifyToken, UserEditInfo);
userRouter.post("/change-password", VerifyToken, ChangePassword);
userRouter.post("/add-address", VerifyToken, AddAddress);

/**
 * PUT
 */

userRouter.put("/Edit-address",VerifyToken,EditAddress)

/**
 * DELETE
 */

userRouter.delete("/delete-address",VerifyToken,DeleteAddress)
export default userRouter;
