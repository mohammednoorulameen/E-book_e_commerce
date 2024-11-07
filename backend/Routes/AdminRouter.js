import express from "express";
const adminRouter = express();

import {
  AdminLogin,
  UserList,
  refreshingToken,
  BlockUser,
  AddCategory,
  getCategory,
  BlockCategory,
  EditCategory,

} from "../Controllers/Admin/AdminController.js";

/*
GET
*/

adminRouter.get("/refresh", refreshingToken);
adminRouter.get("/adminuserslist", UserList);
adminRouter.get("/admingetcategory",getCategory);

/*
POST
*/

adminRouter.post("/adminlogin", AdminLogin);
adminRouter.post("/adminblockuser", BlockUser);
adminRouter.post("/adminaddcategory", AddCategory);
adminRouter.post("/adminblockcategory", BlockCategory);

/*
PUT
*/

adminRouter.put("/admineditcategory", EditCategory);

export default adminRouter;
