import sequelize from "../config/db.js";
import createProductTable from "../database/migrations/products.js";
import { createUserTable } from "../database/migrations/users.js";
import"../database/models/index.js";

const syncDatabase=async()=>{
    try {
        console.log("database starting async....");
        await sequelize.authenticate();
        console.log("database connection established successfully");
        await createUserTable();
        await createProductTable();
        await sequelize.sync({logging:false});
         console.log("Database synced successfully 🔥🔥🔥🔥🔥🔥");
         process.exit(0);
    } catch (error) {
        console.log("Failed to sync database",error);
        process.exit(1);
    }
};

syncDatabase();