import { seedProduct } from "../database/seeds/product.js";
import { seedUsers } from "../database/seeds/user.js";


const runSeed = async() =>{
    try {
        await seedUsers();
        await seedProduct();
        console.log("seeds data inserted successfully");
        process.exit(0)
    }
    catch (erro){
        console.error("failed to seed users", error)
    }
};
runSeed();