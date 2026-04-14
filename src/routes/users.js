import express from "express";
import { createUser, deleteUser, getAllUsers, singleUser, updateUser } from "../controllers/users.js";


const userRoutes=express.Router();

userRoutes.get("/getAllUsers",getAllUsers);
userRoutes.post("/createUser",createUser);
userRoutes.get("/getSingleUser/:id",singleUser);
userRoutes.put("/updateUser/:id",updateUser);
userRoutes.delete("/deleteUser/:id",deleteUser);

export default userRoutes; 
