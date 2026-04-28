import Shop from "../models/shops.js";
import User from "../models/users.js";

export const seedShops = async () => {
    // Get the first user to associate shops with
    const user = await User.findOne();
    if (!user) {
        console.log("No users found, skipping shop seeding");
        return;
    }

    const shops = [
        {
            name: "Tech Hub",
            description: "A shop for all your tech needs",
            owner: user.id,
            contact: "123-456-7890",
            location: "Kigali"
        },
        {
            name: "Gadget Store",
            description: "Latest gadgets and accessories",
            owner: user.id,
            contact: "098-765-4321",
            location: "Nairobi"
        },
    ];
    await Shop.bulkCreate(shops, { ignoreDuplicates: true });
    console.log("shops seeded successfully");
};