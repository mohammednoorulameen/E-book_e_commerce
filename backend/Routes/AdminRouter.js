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
import { AddProduct, ListProduct, BlockProduct, EditProduct, GetEditProduct, } from '../Controllers/Admin/ProductController.js'

/*
GET
*/

adminRouter.get("/refresh", refreshingToken);
adminRouter.get("/adminuserslist", UserList);
adminRouter.get("/admingetcategory", getCategory);
adminRouter.get("/adminlist-Products", ListProduct)
adminRouter.get("/adminlist-Products", ListProduct)
adminRouter.get("/get-edit-product", GetEditProduct)

/*
POST
*/

adminRouter.post("/adminlogin", AdminLogin);
adminRouter.post("/adminblockuser", BlockUser);
adminRouter.post("/adminaddcategory", AddCategory);
adminRouter.post("/adminblockcategory", BlockCategory);
adminRouter.post("/adminadd-product", AddProduct);
adminRouter.post("/admin-block-product", BlockProduct);


/*
PUT
*/

adminRouter.put("/admineditcategory", EditCategory);
adminRouter.put("/admin-edit-product", EditProduct)

export default adminRouter;
