/*======================================== ADMIN AUTHENTICATION CONTROLLER ======================================== */

import User from "../../Models/userModel.js";
import bcrypt  from "bcrypt";
import { AccessToken, RefreshToken  } from "../../Utils/Tokens.js";
const maxage = 7 * 24 * 60 * 60 * 1000;


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
        const userList = await User.find({isAdmin:false})
        console.log(userList);
        
        res.status(200).json({ message: "get user success",userList})
        
    } catch (error) {
        console.log(error,"userlist");
    }
}

export {
     AdminLogin,
     UserList,

     };


/*
controll referesh token
*/

// const refreshingToken = (req,res) => {
//     const cookies = req.cookies.adminJwt;
//     if (!cookies) {
//     return res.status(401).json({ message: "Unatherized" })
//     } 

//     const refreshingToken = cookies;
//     jwt.verify(
//         refreshingToken,
//         process.env.REFRESH_TOKEN,
//         async(err,user) =>{
//             try {
//                 if (err) {
//                    return res.status(403).json({ message: "Forbidden" })
//                 }
//                 if (!user.isAdmin) {
//                     return res.status(403).json({ message: "You are not allowed" })
//                 }
//                 const userData = await User.findById(user.id)
//                 if (!userData) {
//                     return res.status(404).json({ message: "user not found" })
//                 }
//                 const access_token = AccessToken({ id: userData._id, isAdmin: true }); // generate access token 
//                 res.status(200).json({  access_token }) // send  access token 
//             } catch (error) {
//                 res.status(500).json({  message : "Internal server error" }) // send  access token 
                
//             }
//         }
//     )
// } 



