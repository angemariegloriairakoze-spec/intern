import Shop from "../database/models/shops.js";

export const getAllShops = async (req, res) => {
    try {
        const allShops = await Shop.findAll();
        res.status(200).json(allShops);
        console.log("All shops in the system are: ", allShops);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const singleShop = async (req, res) => {
    try {
        const shop = await Shop.findByPk(req.params.id);
        if (!shop) return res.status(404).json({ message: "Shop not found" });
        res.status(200).json(shop);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createShop = async (req, res) => {
    try {
        const existingShop = await Shop.findOne({ where: { name: req.body.name } });
        if (existingShop) return res.status(400).json({ message: "Shop with that name already exists" });
        
        const shop = await Shop.create({ ...req.body, owner: req.user.id });
        res.status(201).json({ message: "Shop created successfully", shop });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateShop = async (req, res) => {
    try {
        const existShop = await Shop.findByPk(req.params.id);
        if (!existShop) return res.status(404).json({ message: "Shop we want to update is not found" });
        if (existShop.owner !== req.user.id) return res.status(403).json({ message: "You are not authorized to update this shop" });
        
        await existShop.update(req.body);
        res.status(200).json({ message: "Shop updated successfully", existShop });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteShop = async (req, res) => {
    try {
        const findShop = await Shop.findByPk(req.params.id);
        if (!findShop) return res.status(404).json({ message: "Shop you need to delete is not found!" });
        if (findShop.owner !== req.user.id) return res.status(403).json({ message: "You are not authorized to delete this shop" });
        
        await findShop.destroy();
        res.status(200).json({ message: "Good bye, shop deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOwnerShops = async (req, res) => {
    try {
        const ownerShops = await Shop.findAll({ where: { owner: req.user.id } });
        res.status(200).json(ownerShops);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
