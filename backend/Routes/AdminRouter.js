import express from 'express'
const  adminRouter = express()

import { AdminLogin, UserList, refreshingToken, BlockUser } from "../Controllers/Admin/Admin.AuthController.js";


adminRouter.post('/adminlogin',AdminLogin)
adminRouter.get('/refresh',refreshingToken)
adminRouter.get('/adminuserslist',UserList)
adminRouter.post('/adminblockuser',BlockUser)

export default adminRouter