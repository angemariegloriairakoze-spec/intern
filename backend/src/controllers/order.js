import Order from "../database/models/orders.js";
import Product from "../database/models/products.js";
import Shop from "../database/models/shops.js";
import User from "../database/models/users.js";
import Notification from "../database/models/notifications.js";

export const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.findAll();
        
        // Get customer and product details for each order
        const ordersWithDetails = await Promise.all(
            allOrders.map(async (order) => {
                const customer = await User.findByPk(order.userId, {
                    attributes: ['id', 'fullName', 'email', 'phoneNumber', 'location', 'gender', 'age']
                });
                const product = await Product.findByPk(order.productId, {
                    attributes: ['id', 'name', 'price', 'size']
                });
                
                return {
                    ...order.toJSON(),
                    customer: customer ? customer.toJSON() : null,
                    product: product ? product.toJSON() : null
                };
            })
        );
        
        res.status(200).json(ordersWithDetails);
        console.log("All orders in the system are: ", ordersWithDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const singleOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        
        // Get customer and product details
        const customer = await User.findByPk(order.userId, {
            attributes: ['id', 'fullName', 'email', 'phoneNumber', 'location', 'gender', 'age']
        });
        const product = await Product.findByPk(order.productId, {
            attributes: ['id', 'name', 'price', 'size']
        });
        
        const orderWithDetails = {
            ...order.toJSON(),
            customer: customer ? customer.toJSON() : null,
            product: product ? product.toJSON() : null
        };
        
        res.status(200).json(orderWithDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        
        if (!product_id || !quantity) {
            return res.status(400).json({ message: "product_id and quantity are required" });
        }
        
        if (quantity <= 0) {
            return res.status(400).json({ message: "Quantity must be greater than 0" });
        }
        
        // Find the product first
        const product = await Product.findByPk(product_id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        
        // Check if requested quantity exceeds available stock
        if (quantity > product.quantity) {
            return res.status(400).json({ 
                message: "Quantity insufficient", 
                available_stock: product.quantity,
                requested_quantity: quantity 
            });
        }
        
        // Find the shop that owns this product
        const shop = await Shop.findByPk(product.shop_id);
        if (!shop) return res.status(404).json({ message: "Shop not found" });
        
        // Get customer details for seller notification
        const customer = await User.findByPk(req.user.id);
        if (!customer) return res.status(404).json({ message: "Customer not found" });
        
        // Get shop owner details for customer notification
        const shopOwner = await User.findByPk(shop.owner);
        if (!shopOwner) return res.status(404).json({ message: "Shop owner not found" });
        
        const totalAmount = parseFloat(product.price) * quantity;
        const order = await Order.create({
            userId: req.user.id,
            productId: product.id,
            sellerId: shop.owner,
            quantity: quantity,
            totalAmount: totalAmount
        });
        
        // Include customer details in the order response
        const orderResponse = {
            ...order.toJSON(),
            customer: {
                id: customer.id,
                fullName: customer.fullName,
                email: customer.email,
                phoneNumber: customer.phoneNumber,
                location: customer.location,
                gender: customer.gender,
                age: customer.age
            },
            product: {
                id: product.id,
                name: product.name,
                price: product.price,
                size: product.size
            },
            shop: {
                id: shop.id,
                name: shop.name,
                owner: shopOwner.fullName
            }
        };
        
        // Enhanced notification for seller with customer details
        await Notification.create({
            userId: shop.owner,
            title: "New Order Received",
            message: `New order from ${customer.fullName} (${customer.email}, ${customer.phoneNumber}) - Age: ${customer.age || 'Not specified'}, Gender: ${customer.gender}, Location: ${customer.location}. Order: ${quantity} x ${product.name} (${product.size}) from ${shop.name}. Total: $${totalAmount}`,
            type: "new_order",
            orderId: order.id
        });
        
        // Enhanced notification for customer with shop and owner details
        await Notification.create({
            userId: req.user.id,
            title: "Order Placed Successfully",
            message: `Your order for ${quantity} x ${product.name} (${product.size}) has been placed at ${shop.name}. Shop owner: ${shopOwner.fullName} (${shopOwner.phoneNumber}). Total: $${totalAmount}. We'll notify you when the order is processed.`,
            type: "order_placed",
            orderId: order.id
        });
        
        res.status(201).json({ message: "Order created successfully", order: orderResponse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!["approved", "denied"].includes(status)) return res.status(400).json({ message: "Invalid status. Must be 'approved' or 'denied'" });
        
        const existOrder = await Order.findByPk(req.params.id);
        if (!existOrder) return res.status(404).json({ message: "Order we want to update is not found" });
        if (existOrder.sellerId !== req.user.id) return res.status(403).json({ message: "You are not authorized to update this order" });
        
        // If order is being approved, reduce product quantity
        if (status === "approved") {
            const product = await Product.findByPk(existOrder.productId);
            if (!product) return res.status(404).json({ message: "Product not found" });
            
            // Check if still enough stock (in case other orders were approved in the meantime)
            if (existOrder.quantity > product.quantity) {
                return res.status(400).json({ 
                    message: "Cannot approve order - insufficient stock", 
                    available_stock: product.quantity,
                    requested_quantity: existOrder.quantity 
                });
            }
            
            // Reduce product quantity
            await product.update({ 
                quantity: product.quantity - existOrder.quantity 
            });
        }
        
        await existOrder.update({ status });
        
        // Get product and shop details for enhanced notifications
        const product = await Product.findByPk(existOrder.productId);
        const shop = await Shop.findByPk(product.shop_id);
        const shopOwner = await User.findByPk(shop.owner);
        
        const notificationTitle = status === "approved" ? "Order Approved" : "Order Denied";
        const notificationMessage = status === "approved" 
            ? `Your order for ${existOrder.quantity} x ${product.name} (${product.size}) from ${shop.name} has been approved! Contact: ${shopOwner.fullName} (${shopOwner.phoneNumber}). Your order will be processed soon.`
            : `Your order for ${existOrder.quantity} x ${product.name} (${product.size}) from ${shop.name} has been denied. Contact: ${shopOwner.fullName} (${shopOwner.phoneNumber}) for more information.`;
        
        await Notification.create({
            userId: existOrder.userId,
            title: notificationTitle,
            message: notificationMessage,
            type: status === "approved" ? "order_approved" : "order_denied",
            orderId: existOrder.id
        });
        
        res.status(200).json({ message: `Order ${status} successfully`, existOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const findOrder = await Order.findByPk(req.params.id);
        if (!findOrder) return res.status(404).json({ message: "Order you need to delete is not found!" });
        if (findOrder.userId !== req.user.id) return res.status(403).json({ message: "You are not authorized to delete this order" });
        
        await findOrder.destroy();
        res.status(200).json({ message: "Good bye, order deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCustomerOrders = async (req, res) => {
    try {
        const customerOrders = await Order.findAll({ where: { userId: req.user.id } });
        res.status(200).json(customerOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSellerOrders = async (req, res) => {
    try {
        // Get orders only for this seller's products
        const sellerOrders = await Order.findAll({ 
            where: { sellerId: req.user.id } 
        });
        
        // Get customer and product details for each order
        const ordersWithDetails = await Promise.all(
            sellerOrders.map(async (order) => {
                const customer = await User.findByPk(order.userId, {
                    attributes: ['id', 'fullName', 'email', 'phoneNumber', 'location', 'gender', 'age']
                });
                const product = await Product.findByPk(order.productId, {
                    attributes: ['id', 'name', 'price', 'size', 'quantity']
                });
                
                return {
                    ...order.toJSON(),
                    customer: customer ? customer.toJSON() : null,
                    product: product ? product.toJSON() : null
                };
            })
        );
        
        res.status(200).json(ordersWithDetails);
        console.log(`Orders for seller ${req.user.id}:`, ordersWithDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
