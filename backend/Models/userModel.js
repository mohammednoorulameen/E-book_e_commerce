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
        required: true,
    },
    password : {
        type : String,
        default : null
    },
    status : {
        type : Boolean,
        default : false
    },
    date : {
        type : Date,
        default : null
    },
    role : { type : String , enum : ['user','admin'], default:'user'}
})

const User = mongoose.model('User',userSchema)
export default User