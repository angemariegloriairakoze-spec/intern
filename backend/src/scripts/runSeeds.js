import { seedOrders } from "../database/seeds/orderSeed.js";
import { seedProducts } from "../database/seeds/productSeed.js";
import { seedShops } from "../database/seeds/shopSeed.js";
import { seedUsers } from "../database/seeds/user.js";


const runSeed = async() =>{
    try {
        await seedUsers();
        await seedProducts();
        await seedOrders();
        await seedShops();
        console.log("seeds data inserted successfully");
        process.exit(0)
    }
    catch (error){
        console.error("failed to seed users", error)
    }
};
runSeed();