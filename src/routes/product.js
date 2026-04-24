import express from "express";
import { getAllProducts, singleProduct, createProduct, updateProduct, deleteProduct, createOrderProduct } from "../controllers/product.js";
import protect from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

const productRoutes = express.Router();

productRoutes.get("/getAllProducts", protect, authorize("admin", "seller", "customer"), getAllProducts);
productRoutes.get("/getSingleProduct/:id", protect, authorize("admin", "seller", "customer"), singleProduct);
productRoutes.post("/createProduct", protect, authorize("admin", "seller"), createProduct);
productRoutes.post("/createOrderProduct", protect, authorize("admin", "customer"), createOrderProduct);
productRoutes.put("/updateProduct/:id", protect, authorize("admin", "seller"), updateProduct);
productRoutes.delete("/deleteProduct/:id", protect, authorize("admin", "seller"), deleteProduct);

export default productRoutes;
