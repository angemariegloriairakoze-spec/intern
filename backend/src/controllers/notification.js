import Notification from "../database/models/notifications.js";

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const markNotificationRead = async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) return res.status(404).json({ message: "Notification not found" });
        if (notification.userId !== req.user.id) return res.status(403).json({ message: "Not authorized to update this notification" });
        
        await notification.update({ isRead: true });
        res.status(200).json({ message: "Notification marked as read", notification });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) return res.status(404).json({ message: "Notification not found" });
        if (notification.userId !== req.user.id) return res.status(403).json({ message: "Not authorized to delete this notification" });
        
        await notification.destroy();
        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUnreadCount = async (req, res) => {
    try {
        const unreadCount = await Notification.count({
            where: { userId: req.user.id, isRead: false }
        });
        res.status(200).json({ unreadCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
