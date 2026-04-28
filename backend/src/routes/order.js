import express from "express";
import { 
    getAllOrders, 
    singleOrder, 
    createOrder, 
    updateOrderStatus, 
    deleteOrder, 
    getCustomerOrders, 
    getSellerOrders 
} from "../controllers/order.js";
import protect from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

const orderRoutes = express.Router();

orderRoutes.get("/getAllOrders", protect, authorize("admin", "seller", "customer"), getAllOrders);
orderRoutes.get("/getSingleOrder/:id", protect, authorize("admin", "seller", "customer"), singleOrder);
orderRoutes.post("/createOrder", protect, authorize("admin", "customer"), createOrder);
orderRoutes.put("/updateOrderStatus/:id", protect, authorize("admin", "seller"), updateOrderStatus);
orderRoutes.delete("/deleteOrder/:id", protect, authorize("admin", "customer"), deleteOrder);
orderRoutes.get("/getCustomerOrders", protect, authorize("admin", "customer"), getCustomerOrders);
orderRoutes.get("/getSellerOrders", protect, authorize("admin", "seller"), getSellerOrders);

export default orderRoutes;
