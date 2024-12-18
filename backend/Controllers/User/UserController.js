/*======================================== USER AUTHENTICATION CONTROLLER ======================================== */

import User from "../../Models/userModel.js";
import Otp from "../../Models/OtpModel.js";
import sendVerificationMail from "../../Utils/mailerService.js";
import { AccessToken, RefreshToken } from "../../Utils/Tokens.js";
import { HashPassword } from "../../Utils/HashPassword.js";
import { GenerateOtp } from "../../Utils/GenerateOtp.js";
import Address from "../../Models/AddressModal.js";
import firebaseAdmin from "../../Config/firebaseAdmin.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
const maxage = 7 * 24 * 60 * 60 * 1000;
dotenv.config();

/*
user refreshing token 
*/

const RefreshingToken = async (req, res) => {
  const refreshToken = req.cookies.userjwt;
  if (!refreshToken) {
    return res.status(401).json({ message: "Unatherized Access" });
  }
  try {
    const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    console.log("user is :", decode);
    const userData = await User.findById(decode.userId);
    console.log("userData", userData);
    if (!userData) {
      return res.status(404).json({ message: "user not found" });
    }
    const access_token = AccessToken(userData._id);
    res.json({ access_token });
  } catch (error) {
    console.log("serer error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/*
user signUp  
*/

const Register = async (req, res) => {
  console.log(req.body);

  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      if (userExist.isVerified) {
        return res
          .status(400)
          .json({ message: "User already exist and is verified" });
      } else {
        const otp = await GenerateOtp(userExist); // otp generate again
        console.log("Resending OTP:", otp);
        await sendVerificationMail(
          {
            email: userExist.email,
            username: userExist.username,
            phone: userExist.phone,
          },
          otp
        );
        return res.status(200).json({
          message:
            "User already exists but is not verified. OTP resent successfully.",
          userId: userExist._id,
        });
      }
    }
    const hashedPassword = await HashPassword(req.body.password);
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
      isAdmin: false,
      isVerified: false,
    });
    const userData = await user.save();
    if (!userData) {
      return res.status(404).json({ message: "user registration failed" });
    }
    const otp = await GenerateOtp(user); // generate otp
    console.log("otp:", otp);

    res.status(200).json({
      message: "Successfully Registration, OTP Send Successfully",
      userId: userData._id,
    });

    await sendVerificationMail(
      {
        email: user.email,
        username: user.username,
        phone: user.phone,
      },
      otp
    );
  } catch (error) {
    console.log("error register", error);

    res.status(500).json({ message: "Server Error,OTP Send Failed" });
  }
};

/*
verify user otp
*/

const VerifyOtp = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      res.status(404).json({ message: "user is not fount" });
    }
    const otpRecord = await Otp.findOne({ userId: req.body.userId });
    if (!otpRecord || otpRecord.otp !== req.body.otp) {
      return res
        .status(404)
        .json({ message: "your otp is expired or incorrect" });
    }

    user.isVerified = true;
    await user.save();
    await Otp.deleteOne({ userId: req.body.userId });

    const access_token = AccessToken(user._id); // generate access token
    const refresh_token = RefreshToken(user._id); // generate refresh token

    // send refresh token
    res.cookie("jwt", refresh_token, {
      httpOnly: true,
      secure: false,
      maxAge: maxage,
    });

    // sending access token

    res.status(200).json({ message: "Login Successful", access_token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

/*
user resend otp
*/

const ResendOtp = async (req, res) => {
  try {
    console.log(req.body);
    const { userId } = req.body;
    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "user cannot find" });
    }

    const otpRecord = await Otp.findOne({ userId });
    if (otpRecord) {
      return res.status(400).json({ message: "your otp is valid" });
    }

    const otp = await GenerateOtp(user); // generate otp
    res
      .status(200)
      .json({ message: "New Otp Send Successfully, Check Your Email" });

    await sendVerificationMail(
      {
        email: user.email,
        username: user.username,
        phone: user.phone,
      },
      otp
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

/*
user login
*/

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "invalid credential" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).json({ message: "invalid credential" });
    }
    if (!user.isVerified) {
      return res.status(404).json({
        message: "OTP not verified, Please register again",
        userId: user._id,
      });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Sorry, You were Blocked Admin" });
    }
    const access_token = AccessToken(user._id); // generate access tken
    const refresh_token = RefreshToken(user._id); // generate refresh token

    res.cookie("userjwt", refresh_token, {
      httpOnly: true,
      secure: false,
      ExpireAt: maxage,
    });

    await res
      .status(200)
      .json({ message: " User Login Successfully ", access_token });
  } catch (error) {
    console.log("error login :", error);
    res.status(500).json({ message: "Internal serer error" });
  }
};

 /**
  * google authentication
  */
const GoogleLogin = async (req,res)=>{

  try {
    const { userToken } = req.body;

    if (!userToken) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const decodedToken = await firebaseAdmin.auth().verifyIdToken(userToken);
    const { name, email, uid } = decodedToken;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        username: name,
        email,
        phone: req.body.phone || '',
        firebaseUid: uid,
        isActive: true,
        isVerified: true,
      });
    }

    const access_token = AccessToken(user._id);
    return res.status(200).json({
      message: "Login successful",
      access_token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        phone : user.phone,
      },
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
 }


/**
 * get user profile
 */

const UserProfile = async (req, res) => {
  const id = req.userId;
  try {
    const userProfile = await User.findById(id);
    if (userProfile.isVerified) {
      res.status(200).json({ message: "success", userProfile });
    } else {
      res.status(404).json({ message: "not allowed" });
    }
  } catch (error) {
    res.status(404).json({ message: "user not fount" });
  }
};

/**
 * user logout
 */

const Logout = (req, res) => {
  res.clearCookie("userjwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
  });
  res.status(200).json({ message: "logout successfully" });
};

/**
 * user edit information
 */

const UserEditInfo = async (req, res) => {
  const id = req?.userId?.id || req.userId;
  try {
    if (!id) {
      res.status(404).json({ message: "updating failed" });
    }
    await User.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(404).json({ message: "user not fount " });
  }
};

/**
 * change password
 */

const ChangePassword = async (req, res) => {
  const id = req?.userId?.id || req.userId;
  console.log("id", id);
  const { currentPassword, password } = req.body;
  console.log("currentPassword,password", currentPassword, password);
  try {
    if (!id) {
      return res.status(404).json({ message: "updating password failed" });
    }
    const user = await User.findById(id);
    if (currentPassword) {
      
    }
    const verifyPassword = await bcrypt.compare(currentPassword, user.password);

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword) {
      return res.status(400).json({ message: "New password cannot be the same as the current password" });
    }
    
    if (verifyPassword) {
      const hashedPassword = await HashPassword(password);
      await User.findByIdAndUpdate(id, { password: hashedPassword });
      res.status(200).json({ message: "password change successfully" });
    } else {
      return res.status(400).json({ message: "password not maatch" });
    }
  } catch (error) {
    res.status(404).json({ message: "user not fount" });
  }
};

/**
 * add address
 */

const AddAddress = async (req, res) => {
  const user_id = req.userId;

  const {
    name,
    phone,
    pincode,
    locality,
    address,
    city,
    state,
    landmark,
    altPhone,
    addressType,
  } = req.body;

  console.log("state,name,locality", state, name, locality);
  try {
    const newAddress = Address.create({
      user_id,
      name,
      phone,
      pincode,
      locality,
      address,
      city,
      state,
      landmark,
      altPhone,
      addressType,
    });

    if (newAddress) {
      res.status(200).json({ message: "address added success" });
    }
  } catch (error) {
    res.state(500).json({ message: "address adding failed" });
  }
};

/**
 * get user address
 */

const GetAddress = async (req, res) => {
  const user_id = req.userId;
  try {
    const addresses = await Address.find({ user_id: user_id });
    res.status(200).json({ message: "address addedd successfully", addresses });
  } catch (error) {
    res.status(500).json({ message: "address addedd failed" });
  }
};

/**
 * user Edit address
 */

const EditAddress = async (req,res) =>{
  const { id } = req.body
  try {
       const address =  await Address.findByIdAndUpdate(id,req.body)
    console.log('address', address)
    res.status(200).json({ message: "Address update successfully" })
  } catch (error) {
    res.status(500).json({ message: "Address update failed" })
  }
}

/**
 * delete address
 */

const DeleteAddress = async (req,res)=>{
  
  const {address_id} = req.body
  try {
    await Address.findOneAndDelete({_id:address_id})
    res.status(200).json({ message: "delete address successfully"})
  } catch (error) {
    res.status(500).json({ message: "delete address failed"})
  }
}

export {
  Register,
  VerifyOtp,
  ResendOtp,
  Login,
  GoogleLogin,
  RefreshingToken,
  UserProfile,
  Logout,
  UserEditInfo,
  ChangePassword,
  AddAddress,
  GetAddress,
  EditAddress,
  DeleteAddress,
};
