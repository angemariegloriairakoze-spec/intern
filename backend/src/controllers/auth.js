import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../database/models/users.js";

//register new account

export const Register= async (req,res) => {
    try {
        const {password,...userData}=req.body;
        const findUser=await User.findOne({where:{email:userData.email}})
        if(findUser){
            return res.status(409).json({message:"User arleady exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const userAccount=await User.create({...userData,password:hashedPassword});
        res.status(201).json({message:"user created succssfully",userAccount})
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

//login

export const login = async (req,res) => {
    try {
        const {email,password}=req.body;
        //check if useeeer is in db

        const user=await User.findOne({where:{email}});
        if(!user){
           return res.status(404).json({message:"user not found"});
        }
        //compare user credentials

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
           return res.status(401).json({message:"invalid credentials"});
        }
        //define token and what it will have

        const token=jwt.sign(
            {id:user.id,
                role:user.role,
                fullName:user.fullName,
                email:user.email,
                phoneNumber:user.phoneNumber,
            },
             process.env.JWT_SECRET,
             {expiresIn:"1d"}
        )
       return  res.status(200).json({message:"user logged in",token})

    } catch (error) {
        console.error(error);
        return res.status(500).json({error:error.message});
    }
}