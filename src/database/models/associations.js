import User from "./user.js";
import Product from "./products.js";
import Shop from "./shops.js";
import Order from "./orders.js";
import Payment from "./payments.js";

/*
====================================
USER ↔ ORDER
One user can make many orders
====================================
*/

User.hasMany(Order, {
    foreignKey: "userId"
});

Order.belongsTo(User, {
    foreignKey: "userId"
});


/*
====================================
PRODUCT ↔ ORDER
One product can be ordered many times
Each order belongs to one product
====================================
*/

Product.hasMany(Order, {
    foreignKey: "productId"
});

Order.belongsTo(Product, {
    foreignKey: "productId"
});


/*
====================================
SELLER ↔ ORDER
Seller receives orders for approval
(forShop in Product = seller id)
====================================
*/

User.hasMany(Order, {
    foreignKey: "sellerId",
    as: "sellerOrders"
});

Order.belongsTo(User, {
    foreignKey: "sellerId",
    as: "seller"
});


/*
====================================
ORDER ↔ PAYMENT
One order has one payment
====================================
*/

Order.hasOne(Payment, {
    foreignKey: "orderId"
});

Payment.belongsTo(Order, {
    foreignKey: "orderId"
});


/*
====================================
SHOP × PRODUCT
One shop can have many products
Each product belongs to one shop
====================================
*/

Shop.hasMany(Product, {
    foreignKey: "shop_id"
});

Product.belongsTo(Shop, {
    foreignKey: "shop_id"
});


/*
====================================
USER × SHOP (SELLER)
One user (seller) can own many shops
Each shop belongs to one user (seller)
====================================
*/

User.hasMany(Shop, {
    foreignKey: "owner",
    as: "ownedShops"
});

Shop.belongsTo(User, {
    foreignKey: "owner",
    as: "owner"
});