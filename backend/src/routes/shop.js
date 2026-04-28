import express from "express";
import { 
    getAllShops, 
    singleShop, 
    createShop, 
    updateShop, 
    deleteShop, 
    getOwnerShops 
} from "../controllers/shop.js";
import protect from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

const shopRoutes = express.Router();

shopRoutes.get("/getAllShops", protect, authorize("admin", "seller", "customer"), getAllShops);
shopRoutes.get("/getSingleShop/:id", protect, authorize("admin", "seller", "customer"), singleShop);
shopRoutes.post("/createShop", protect, authorize("admin", "seller"), createShop);
shopRoutes.put("/updateShop/:id", protect, authorize("admin", "seller"), updateShop);
shopRoutes.delete("/deleteShop/:id", protect, authorize("admin", "seller"), deleteShop);
shopRoutes.get("/getOwnerShops", protect, authorize("admin", "seller"), getOwnerShops);

export default shopRoutes;
