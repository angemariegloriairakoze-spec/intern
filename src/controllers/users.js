import User from "../database/models/users.js";
import  bcrypt from "bcrypt"

// get all users of the system
export const getAllUsers=async(req,res)=>{
    try {
        const allUsers=await User.findAll();
        res.status(200).json(allUsers);
        console.log("All users who are in the system are: ",allUsers)
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

// get single user
export const singleUser=async(req,res)=>{
    try {
        const user=await User.findByPk(req.params.id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

//create user
export const createUser=async(req,res)=>{
    try {
        const {password,...userData}=req.body;
        const existingUser=await User.findOne({where:{email:userData.email}})
        if(existingUser){
            return res.status(400).json({message:"User with that email arleady exist"});
        }
        const hashPassword=await bcrypt.hash(password,10);
        const user=await User.create({...userData,password:hashPassword});
        res.status(201).json({message:"User account created succ"});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

// update user
export const updateUser=async(req,res)=>{
    try {
        const existUser=await User.findByPk(req.params.id);
        if(!existUser){
           return res.status(404).json({message:"User we want to update is not found"});
        }
        
        await existUser.update(req.body);
        res.status(200).json({message:"User updated successfully",existUser});
    } catch (error) {
        res.status(500).json(({error:error.message}));
    }
}

// delete user
export const deleteUser=async(req,res)=>{
    try {
        const findUser=await User.findByPk(req.params.id);
        if(!findUser){
            return res.status(404).json({message:"User you need to delete is not found!"});
        }
        await findUser.destroy();
        res.status(200).json({message:"Good bye, deleted succ"});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}