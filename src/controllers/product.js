import Product from "../database/models/products.js";
import Shop from "../database/models/shops.js";

// get all products of the system
export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.findAll();
        res.status(200).json(allProducts);
        console.log("All products in the system are: ", allProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get single product
export const singleProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// create product (for sellers)
export const createProduct = async (req, res) => {
    try {
        const existingProduct = await Product.findOne({ where: { name: req.body.name } });
        if (existingProduct) return res.status(400).json({ message: "Product with that name already exists" });
        
        // Handle shop_id - seller must provide shop_id
        const shopId = req.body.shop_id;
        if (!shopId) return res.status(400).json({ message: "shop_id is required" });
        
        // Verify the shop exists and belongs to the seller
        const shop = await Shop.findOne({ where: { id: shopId, owner: req.user.id } });
        if (!shop) return res.status(404).json({ message: "Shop not found or you don't own this shop" });
        
        const product = await Product.create({ ...req.body, shop_id: shopId });
        
        // Include shop name in the response
        const productWithShopName = {
            ...product.toJSON(),
            shop_name: shop.name
        };
        
        res.status(201).json({ 
            message: "Product created successfully", 
            product: productWithShopName 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// update product
export const updateProduct = async (req, res) => {
    try {
        const existProduct = await Product.findByPk(req.params.id);
        if (!existProduct) return res.status(404).json({ message: "Product we want to update is not found" });
        await existProduct.update(req.body);
        res.status(200).json({ message: "Product updated successfully", existProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// delete product
export const deleteProduct = async (req, res) => {
    try {
        const findProduct = await Product.findByPk(req.params.id);
        if (!findProduct) return res.status(404).json({ message: "Product you need to delete is not found!" });
        await findProduct.destroy();
        res.status(200).json({ message: "Good bye, product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// create order product (for customers - only product_id and quantity)
export const createOrderProduct = async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        
        if (!product_id || !quantity) {
            return res.status(400).json({ message: "product_id and quantity are required" });
        }
        
        // Verify the product exists
        const product = await Product.findByPk(product_id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        
        // Get shop information for the response
        const shop = await Shop.findByPk(product.shop_id);
        
        const productWithShopName = {
            ...product.toJSON(),
            shop_name: shop ? shop.name : null,
            requested_quantity: quantity
        };
        
        res.status(200).json({ 
            message: "Product added to order", 
            product: productWithShopName 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};