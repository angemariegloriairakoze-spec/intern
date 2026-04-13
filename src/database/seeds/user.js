import User from "../models/users.js";
import bcrypt from "bcrypt";

export const seedUsers = async () => {
    const hashPassword = await bcrypt.hash("password123",10)
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
        type:"customer"
      

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
        type:"seller"
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
        type:"delivery"
      },
      {
        fullName: "ston",
        email: "ston@gmail.com",
        phoneNumber: "0781232233",
        location: "Musanze",
        gender: "male",
        password: hashPassword,
        age:20,
        date_of_birth:"03/01/2001",
        type:"admin"
      },
    ];
    await User.bulkCreate(users, {ignoreDuplicates: true});
}