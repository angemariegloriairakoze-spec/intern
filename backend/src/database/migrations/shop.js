import sequelize from "../../config/db.js";
import Shop from "../models/shops.js";

export const createShopTable = async () => {
    await sequelize.authenticate();
    await Shop.sync({ alter: true });
    console.log("shop table created successfully");
};