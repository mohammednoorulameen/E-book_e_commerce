import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from './Routes/userRouter.js';
import adminRouter from './Routes/AdminRouter.js';
import connectDB from "./Config/dbConnection.js";



const port = process.env.PORT || 4040
dotenv.config()
const app = express();
connectDB()

app.use(express.json())
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,  
};

// middleware
app.use(cors(corsOption))
app.use(cookieParser())


// api end points 
app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)



// server

app.listen(port,()=>{
  console.log(`server is running ${port}`);
  
})






