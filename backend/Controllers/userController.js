import User from "../Models/userModel.js";
import Otp from "../Models/OtpModel.js";
import sendVerificationMail from "../Utils/mailerService.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

/*
hashing password from password
*/

const HashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.log(error, "password hash error");
  }
};

/*
generate otp 
*/

const GenerateOtp = async (user) => {
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpiresAt = Date.now();
  const id = user._id || user.userId;
  console.log('check id ',id)

  const newOtp = new Otp({
    userId: id,
    otp,
    otpExpiresAt,
  });

  await newOtp.save();
  return otp;
};

/*
signUp user 
*/

const register = async (req, res) => {
  console.log(req.body);
  
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      res.status(400).json({ message: "User already exist" });
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
      res.status(404).json({ message: "user registration failed" });
    }
    const otp = await GenerateOtp(user); // generate otp
    console.log('otp:',otp);

    await sendVerificationMail({
      email : user.email, username : user.username, phone : user.phone
    }, otp)

   return res
      .status(200)
      .json({
        message: "Successfully Registration, OTP Send Successfully",
        userId: userData._id,
      });
      
  } catch (error) {
    console.log("error register",error);
    
    res.status(500).json({ message: "Server Error,OTP Send Failed" });
  }
};

export { register };
