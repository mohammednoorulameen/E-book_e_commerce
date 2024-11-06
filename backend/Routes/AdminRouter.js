import express from 'express'
const  adminRouter = express()

import { AdminLogin, UserList,  } from "../Controllers/Admin/Admin.AuthController.js";


adminRouter.post('/adminlogin',AdminLogin)
adminRouter.post('/adminuserslist',UserList)

export default adminRouter