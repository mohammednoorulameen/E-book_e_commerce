/*======================================== ADMIN AUTHENTICATION CONTROLLER ======================================== */

import User from "../../Models/userModel.js";
import bcrypt  from "bcrypt";
import { AccessToken, RefreshToken  } from "../../Utils/Tokens.js";
const maxage = 7 * 24 * 60 * 60 * 1000;
import mongoose  from 'mongoose';

/*
controll referesh token
*/

const refreshingToken = (req,res) => {
    const cookies = req.cookies.adminJwt;
    if (!cookies) {
    return res.status(401).json({ message: "Unatherized" })
    } 

    const refreshingToken = cookies;
    jwt.verify(
        refreshingToken,
        process.env.REFRESH_TOKEN,
        async(err,user) =>{
            try {
                if (err) {
                   return res.status(403).json({ message: "Forbidden" })
                }
                if (!user.isAdmin) {
                    return res.status(403).json({ message: "You are not allowed" })
                }
                const userData = await User.findById(user.id)
                if (!userData) {
                    return res.status(404).json({ message: "user not found" })
                }
                const access_token = AccessToken({ id: userData._id, isAdmin: true }); // generate access token 
                res.status(200).json({  access_token }) // send  access token 
            } catch (error) {
                res.status(500).json({  message : "Internal server error" }) // send  access token 
                
            }
        }
    )
} 


/*
admin login
 */
const AdminLogin = async (req, res) => {
    
    const adminData = await User.findOne({ email : req.body.email })

    if (!adminData) {
        return res.status(401).json({ message: "invalid password or email"})
    }
    const isPasswordMatch = await bcrypt.compare(req.body.password,adminData.password)
    if (!isPasswordMatch) {
        return  res.status(401).json({ message : "invalid password or email" })
    }
    if (!adminData.isActive) {
        return res.status(403).json({ message: "Sorry, you are blocked" })
    }
    if (adminData.role == 'admin') {
        
        const access_token = AccessToken({ id : adminData._id, isAdmin: true }); // generate access token 
        const refresh_token = RefreshToken({ id : adminData._id, isAdmin: true }) // generatew refresh token 
        
        // send rfresh token 
        res.cookie("adminJwt", refresh_token, {
            httpOnly : true,
            secure : false,
            ExpireAt : maxage
            
        });   
        res.status(200).json({ message:"Login successfully", access_token}) // send  access token 
    }else{
        return res.status(403).json({ message: "Sorry, you are not allowed" })
    }
};

/*
get users list 
*/

const UserList = async (req,res) =>{
    try {
        const usersList = await User.find({isAdmin:false})        
        res.status(200).json({ message: "get user success",usersList})
        
    } catch (error) {
        console.log(error,"userlist");
        res.status(500).json({ message: "Failed to get users" })
    }
}

/*
admin block user
*/

const BlockUser = async (req, res)=>{
  const  {id} = req.body

  try {
    if (id && mongoose.Types.ObjectId.isValid(id)) {
        const  user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
       user.isActive = !user.isActive
       await user.save();

       res.status(200).json({ message: "success" })
       }else{
        res.status(200).json({ message: "Invalid or missing user ID" })
       }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
}



export {
     AdminLogin,
     UserList,
     refreshingToken,
     BlockUser,

     };

