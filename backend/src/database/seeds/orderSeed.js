import Order from "../models/orders.js";
import User from "../models/users.js";
import Product from "../models/products.js";

export const seedOrders = async () => {
    try {

        const user = await User.findOne();
        const product = await Product.findOne();
        const seller = await User.findOne({
            where: { role: "seller" }
        });

        if (!user || !product || !seller) {
            console.log("Missing user/product/seller, skipping seed");
            return;
        }

        const orders = [
            {
                totalAmount: 1029.98,
                status: "pending",
                userId: user.id,
                productId: product.id,
                sellerId: seller.id,
                quantity: 2,
                orderDate: new Date(),
            },
            {
                totalAmount: 379.98,
                status: "approved",
                userId: user.id,
                productId: product.id,
                sellerId: seller.id,
                quantity: 1,
                orderDate: new Date(),
            }
        ];

        await Order.bulkCreate(orders);

        console.log("Orders seeded successfully");

    } catch (error) {
        console.log("Order seed error:", error.message);
    }
};