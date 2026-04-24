import User from "../models/users.js";
import bcrypt from "bcrypt";

export const seedUsers = async () => {
    const hashPassword = await bcrypt.hash("password123",10)
    const adminHashPassword = await bcrypt.hash("angel@23",10)
    const users = [
      {
        fullName: "Kamayirese",
        email: "kamayirese@gmail.com",
        phoneNumber: "0781234566",
        location: "Nyamirambo",
        gender: "male",
        password: hashPassword,
        age:30,
        date_of_birth:"01/01/2000",
        role:"customer"
      

      },
      {
        fullName: "Kamanzi",
        email: "kamanzi@gmail.com",
        phoneNumber: "0781234546",
        location: "Nyamirambo",
        gender: "male",
        password: hashPassword,
        age:20,
        date_of_birth:"01/02/2000",
        role:"seller"
      },
      {
        fullName: "Deborah",
        email: "deborah@gmail.com",
        phoneNumber: "0781234564",
        location: "Nyamirambo",
        gender: "female",
        password: hashPassword,
        age:40,
        date_of_birth:"03/01/2001",
        role:"delivery"
      },
      {
        fullName: "Angel Marie Irakoze",
        email: "angemariegloriairakoze@gmail.com",
        phoneNumber: "0781234567",
        location: "Kigali",
        gender: "female",
        password: adminHashPassword,
        age:25,
        date_of_birth:"01/01/1999",
        role:"admin"
      },
    ];
    await User.bulkCreate(users, {ignoreDuplicates: true});
}