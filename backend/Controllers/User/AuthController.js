import User from "../../Models/userModel.js";
import Otp from "../../Models/OtpModel.js";
import sendVerificationMail from "../../Utils/mailerService.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { access } from "fs";
// const maxage = 3 * 24 * 60 * 60;
const maxage = 7 * 24 * 60 * 60 * 1000;
dotenv.config();

/*
create access token
*/

const AccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN, {
    expiresIn: "30m",
  });
};

/*
create a refresh token
*/

const RefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN, {
    expiresIn: "7d",
  });
};

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
  console.log("check id ", id);

  const newOtp = new Otp({
    userId: id,
    otp,
    otpExpiresAt,
  });

  await newOtp.save();
  return otp;
};

/*
user refreshing token 
*/

const RefreshingToken = (req, res) => {
  const cookies = req.cookies.jwt;
  if (!cookies) {
    return res.status(401).json({ message: "Unatherized Access" });
  }
  jwt.verify(RefreshingToken, process.env.REFRESH_TOKEN, async (err, user) => {
    try {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }
      const userData = await User.findById(user.id);
      if (!userData || !userData.isActive) {
        return res.status(401).json({ message: "Unauthourized" });
      }

      const access_token = AccessToken({ id: userData._id, isAdmin: true });
      res.json({ access_token });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

/*
user signUp  
*/

const Register = async (req, res) => {
  console.log(req.body);

  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
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

    const access_token = AccessToken({ id: user._id }); // generate access token
    const refresh_token = RefreshToken({ id: user._id }); // generate refresh token

    // send refresh token
    res.cookie("jwt", refresh_token, {
      httOnly: true,
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
     return res.status(401).json({ message: "invalid credential" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
    return  res.status(401).json({ message: "invalid credential" });
    }
    if (!user.isVerified) {
      return res
        .status(401)
        .json({ message: " otp is send to your email", userId: user._id });
    }

    if (!user.isActive) {
    return  res.status(403).json({ message: "Sorry, You were Blocked Admin" });
    }
    const access_token = await AccessToken({ id: user._id }); // generate access tken
    const refresh_token = await RefreshToken({ id: user._id }); // generate refresh token

    res.cookie("jwt", refresh_token, {
      httOnly: true,
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

export { Register, VerifyOtp, ResendOtp, Login };
