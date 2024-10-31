import express from "express";
const userRouter = express.Router()
import {register} from "../Controllers/userController.js";


userRouter.post('/register',register)



export default userRouter