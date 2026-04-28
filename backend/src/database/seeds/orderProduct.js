import "../models/index.js";
import Order from "../models/orders.js";
import Product from "../models/product.js";

export const seedOrderProducts = async () => {
    const order = await Order.findOne();
    const products = await Product.findAll({ limit: 2 });

    if (!order || products.length < 2) {
        console.log("Not enough orders or products found, skipping orderProducts seeding");
        return;
    }

    await order.addProducts(products);

    console.log("orderProducts seeded successfully");
};