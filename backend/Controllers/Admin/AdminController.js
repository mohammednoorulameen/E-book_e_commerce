/*======================================== ADMIN AUTHENTICATION CONTROLLER ======================================== */

import User from "../../Models/userModel.js";
import bcrypt from "bcrypt";
import { AccessToken, RefreshToken } from "../../Utils/Tokens.js";
const maxage = 7 * 24 * 60 * 60 * 1000;
import mongoose from "mongoose";
import Category from "../../Models/CategoryModel.js";

/*
controll referesh token
*/

const refreshingToken = (req, res) => {
  const cookies = req.cookies.adminJwt;
  if (!cookies) {
    return res.status(401).json({ message: "Unatherized" });
  }

  const refreshingToken = cookies;
  jwt.verify(refreshingToken, process.env.REFRESH_TOKEN, async (err, user) => {
    try {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }
      if (!user.isAdmin) {
        return res.status(403).json({ message: "You are not allowed" });
      }
      const userData = await User.findById(user.id);
      if (!userData) {
        return res.status(404).json({ message: "user not found" });
      }
      const access_token = AccessToken({ id: userData._id, isAdmin: true }); // generate access token
      res.status(200).json({ access_token }); // send  access token
    } catch (error) {
      res.status(500).json({ message: "Internal server error" }); // send  access token
    }
  });
};

/*
admin login
 */
const AdminLogin = async (req, res) => {
  const adminData = await User.findOne({ email: req.body.email });

  if (!adminData) {
    return res.status(401).json({ message: "invalid password or email" });
  }
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    adminData.password
  );
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "invalid password or email" });
  }
  if (!adminData.isActive) {
    return res.status(403).json({ message: "Sorry, you are blocked" });
  }
  if (adminData.role == "admin") {
    const access_token = AccessToken({ id: adminData._id, isAdmin: true }); // generate access token
    const refresh_token = RefreshToken({ id: adminData._id, isAdmin: true }); // generatew refresh token

    // send rfresh token
    res.cookie("adminJwt", refresh_token, {
      httpOnly: true,
      secure: false,
      ExpireAt: maxage,
    });
    res.status(200).json({ message: "Login successfully", access_token }); // send  access token
  } else {
    return res.status(403).json({ message: "Sorry, you are not allowed" });
  }
};

/*
get users list 
*/

const UserList = async (req, res) => {
  try {
    const usersList = await User.find({ isAdmin: false });
    res.status(200).json({ message: "get user success", usersList });
  } catch (error) {
    console.log(error, "userlist");
    res.status(500).json({ message: "Failed to get users" });
  }
};



/**
 * admin block user
 */

const BlockUser = async (req, res) => {
  const { id } = req.body;

  try {
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      user.isActive = !user.isActive;
      await user.save();

      res.status(200).json({ message: "success" });
    } else {
      res.status(400).json({ message: "Invalid or missing user ID" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

/*
add category
*/

const AddCategory = async (req, res) => {
  const { category, description } = req.body;
  if (category.trim() === "") {
    return res.status(401).json({ message: "category cannot  be empty " });
  }
  if (description.trim() === "") {
    return res.status(401).json({ message: "description cannot be empty" });
  }
  try {
    const ExistCategory = await Category.findOne({ category });
    if (ExistCategory) {
      return res.status(404).json({ message: "This category is already" });
    }
    const newCategory = new Category({
      category,
      description,
    });
    await newCategory.save();
    await res.status(200).json({ message: "category added success" });
  } catch (error) {
    res.status(401).json({ message: "category error" });
  }
};

/*
 get category list
*/

const getCategory = async (req, res) => {
  try {
    const categoryData = await Category.find();
    res
      .status(200)
      .json({ message: "category getting successful", categoryData });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/*
admin block and unblock category
*/

const BlockCategory = async (req, res) => {
  const { id } = req.body;
  try {
    if (id) {
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({ message: "category not found" });
      }
      category.status = !category.status;
      await category.save();
      res.status(200).json({ message: "success" });
    } else {
      res.status(200).json({ message: "Invalid or missing category id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

/*
 * admin Edit category
 */

const EditCategory = async (req, res) => {
  const { category, description, id } = req.body;
   console.log(category, description, id)
  if (!category || category.trim() === "") {
    return res.status(401).json({ message: "category cannot be empty" });
  }
  if (!description || description.trim() === "") {
    return res.status(401).json({ message: "description cannot be empty" });
  }
  try {
    // const { ObjectId } = mongoose.Types;
    const ExistCategory = await Category.findOne({
      $and: [{ category }, { _id: { $ne: id } }],
    });

// const ExistCategory = await Category.findOne({
//   $and: [{ category }, { _id: { $ne: ObjectId(id) } }],
// });
    if (ExistCategory) {
     return res.status(401).json({ message: "Category already exist" });
    }

    const updateCategory = await Category.findByIdAndUpdate(id,{ category,description },{new:true});
    console.log(updateCategory)
    if (!updateCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category update successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

export {
  AdminLogin,
  UserList,
  refreshingToken,
  BlockUser,
  AddCategory,
  getCategory,
  BlockCategory,
  EditCategory,
};
