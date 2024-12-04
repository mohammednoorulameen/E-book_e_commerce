import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    username : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
   phone : {
        type : String,
        required: null,
    },
    password : {
        type : String,
        default : null
    },
    googleId : {
        type : String,
        unique : true,
        sparse : true,
    },
    isActive : {
        type : Boolean,
        default : true,
    },
    isVerified : {
        type : Boolean,
        required :true,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    },
    otp : {
        type : String
    },
    otpExpireAt : {
        type : Date
    },
     role: {type: String, enum: [ 'user', 'admin'],default:'user'}
},
{timestamps : true})


const User = mongoose.model('User',userSchema)
export default User