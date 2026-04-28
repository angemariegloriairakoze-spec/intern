import express from "express";
import { 
    getNotifications, 
    markNotificationRead, 
    deleteNotification, 
    getUnreadCount 
} from "../controllers/notification.js";
import protect from "../middleware/auth.js";

const notificationRoutes = express.Router();

notificationRoutes.get("/getNotifications", protect, getNotifications);
notificationRoutes.put("/markNotificationRead/:id", protect, markNotificationRead);
notificationRoutes.delete("/deleteNotification/:id", protect, deleteNotification);
notificationRoutes.get("/getUnreadCount", protect, getUnreadCount);

export default notificationRoutes;
