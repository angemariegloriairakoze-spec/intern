import sequelize from "../../config/db.js";
import Order from "../models/orders.js";

export const createOrderTable = async () => {
    await sequelize.authenticate();
    await Order.sync({ alter: true });
    console.log("order table created successfully");
};