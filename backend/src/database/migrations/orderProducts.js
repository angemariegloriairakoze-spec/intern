import sequelize from "../../config/db.js";
import OrderProduct from "../models/orderProduct.js";

export const createOrderProductsTable = async () => {
    await sequelize.authenticate();
    await OrderProduct.sync({ alter: true });
    console.log("orderProducts table created successfully");
};