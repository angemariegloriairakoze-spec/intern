import Order from "../database/models/orders.js";
import Product from "../database/models/products.js";
import Shop from "../database/models/shops.js";
import Notification from "../database/models/notifications.js";

export const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.findAll();
        res.status(200).json(allOrders);
        console.log("All orders in the system are: ", allOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const singleOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(order);
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
        
        const totalAmount = parseFloat(product.price) * quantity;
        const order = await Order.create({
            userId: req.user.id,
            productId: product.id,
            sellerId: shop.owner,
            quantity: quantity,
            totalAmount: totalAmount
        });
        
        await Notification.create({
            userId: shop.owner,
            title: "New Order Received",
            message: `You have a new order for ${quantity} x ${product.name} (${product.size}) from ${shop.name}. Total: $${totalAmount}`,
            type: "new_order",
            orderId: order.id
        });
        
        res.status(201).json({ message: "Order created successfully", order });
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
        
        const notificationTitle = status === "approved" ? "Order Approved" : "Order Denied";
        const notificationMessage = status === "approved" 
            ? `Your order for ${existOrder.quantity} x product has been approved!`
            : `Your order for ${existOrder.quantity} x product has been denied.`;
        
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
        const sellerOrders = await Order.findAll({ where: { sellerId: req.user.id } });
        res.status(200).json(sellerOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
