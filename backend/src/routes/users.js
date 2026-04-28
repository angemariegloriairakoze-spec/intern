import express from "express";
import { createUser, deleteUser, getAllUsers, singleUser, updateUser } from "../controllers/users.js";
import protect from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";


const userRoutes=express.Router();

userRoutes.get("/getAllUsers",protect,authorize("admin","seller"),getAllUsers);
userRoutes.post("/createUser",protect,authorize("admin","seller","customer"),createUser);
userRoutes.get("/getSingleUser/:id",protect,authorize("admin","seller","customer"),singleUser);
userRoutes.put("/updateUser/:id",protect,authorize("admin","customer"),updateUser);
userRoutes.delete("/deleteUser/:id",protect,authorize("admin","customer"),deleteUser);

export default userRoutes; 
