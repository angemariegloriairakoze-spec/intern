import Product from "../models/products.js";
import Shop from "../models/shops.js";

export const seedProducts = async () => {
    // Get shops to associate products with
    const shops = await Shop.findAll();
    if (shops.length === 0) {
        console.log("No shops found, skipping product seeding");
        return;
    }

    const products = [
        {
            name: "Classic Pants",
            price: "999.99",
            size: "large",
            type: "gabo",
            description: "Comfortable and stylish pants for everyday wear.",
            image: "pants.jpg",
            status: "available",
            shop_id: shops[0].id
        },
        {
            name: "Premium T-Shirt",
            price: "29.99",
            size: "medium",
            type: "gabo",
            description: "Comfortable and stylish t-shirt for everyday wear.",
            image: "tshirt.jpg",
            status: "available",
            shop_id: shops[0].id
        },
        {
            name: "Comfort Boxer Shorts",
            price: "79.99",
            size: "small",
            type: "abana",
            description: "Comfortable and stylish boxer shorts for everyday wear.",
            image: "boxer.jpg",
            status: "available",
            shop_id: shops[1].id
        },
        {
            name: "Warm Jumper",
            price: "299.99",
            size: "large",
            type: "gabo",
            description: "Warm and comfortable jumper for cold weather.",
            image: "jumper.jpg",
            status: "available",
            shop_id: shops[1].id
        },
        {
            name: "Sports Shoes",
            price: "120.00",
            size: "42",
            type: "gabo",
            description: "Comfortable running shoes for sports activities",
            image: "shoes.jpg",
            status: "available",
            shop_id: shops[0].id
        },
        {
            name: "Kids T-Shirt",
            price: "15.00",
            size: "small",
            type: "abana",
            description: "Comfortable t-shirt for kids",
            image: "kids-tshirt.jpg",
            status: "available",
            shop_id: shops[1].id
        }
    ];
    // Delete all existing products first
    await Product.destroy({ where: {}, force: true });
    console.log("Existing products deleted.");
    // Then create new products
    await Product.bulkCreate(products);
    console.log("products seeded successfully");
};