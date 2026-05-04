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
/**
 * @swagger
 * /api/getSellerOrders:
 *   get:
 *     summary: Get all orders for the authenticated seller's products
 *     description: Returns a list of orders for products owned by the authenticated seller, including full customer and product details (no user IDs)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved seller's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: "123e4567-e89b-12d3-a456-426614174000"
 *                   quantity:
 *                     type: integer
 *                     example: 2
 *                   status:
 *                     type: string
 *                     enum: [pending, approved, denied]
 *                     example: "pending"
 *                   orderDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-01-15T10:30:00Z"
 *                   totalAmount:
 *                     type: number
 *                     format: decimal
 *                     example: 50.00
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-01-15T10:30:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-01-15T10:30:00Z"
 *                   customer:
 *                     type: object
 *                     description: Full customer information (no user ID)
 *                     properties:
 *                       fullName:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "john@example.com"
 *                       phoneNumber:
 *                         type: string
 *                         example: "+1234567890"
 *                       location:
 *                         type: string
 *                         example: "New York"
 *                       gender:
 *                         type: string
 *                         example: "male"
 *                       age:
 *                         type: integer
 *                         example: 25
 *                   product:
 *                     type: object
 *                     description: Full product information (no product ID)
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "Classic Pants"
 *                       price:
 *                         type: number
 *                         format: decimal
 *                         example: 25.00
 *                       size:
 *                         type: string
 *                         example: "Large"
 *                       quantity:
 *                         type: integer
 *                         example: 100
 *                   seller:
 *                     type: object
 *                     description: Full seller information (no seller ID)
 *                     properties:
 *                       fullName:
 *                         type: string
 *                         example: "Jane Smith"
 *                       email:
 *                         type: string
 *                         example: "jane@example.com"
 *                       phoneNumber:
 *                         type: string
 *                         example: "+1234567891"
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Seller access required
 *       500:
 *         description: Internal server error
 */
orderRoutes.get("/getSellerOrders", protect, authorize("admin", "seller"), getSellerOrders);

export default orderRoutes;
