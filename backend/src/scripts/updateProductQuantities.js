import sequelize from '../config/db.js';
import Product from '../database/models/products.js';

const updateProductQuantities = async () => {
    try {
        console.log('Connecting to database...');
        await sequelize.authenticate();
        console.log('Database connected successfully!');

        // Get all products
        const products = await Product.findAll();
        console.log(`Found ${products.length} products to update`);

        // Update each product with a random quantity between 1 and 100
        for (const product of products) {
            const randomQuantity = Math.floor(Math.random() * 100) + 1; // Random quantity between 1-100
            
            await product.update({ quantity: randomQuantity });
            console.log(`Updated product "${product.name}" - Quantity: ${randomQuantity}`);
        }

        console.log('All products have been updated with quantities!');
        
        // Show updated products
        const updatedProducts = await Product.findAll({
            attributes: ['id', 'name', 'quantity']
        });
        
        console.log('\n=== Updated Products ===');
        updatedProducts.forEach(product => {
            console.log(`ID: ${product.id}, Name: ${product.name}, Quantity: ${product.quantity}`);
        });

    } catch (error) {
        console.error('Error updating product quantities:', error);
    } finally {
        await sequelize.close();
        console.log('Database connection closed.');
    }
};

updateProductQuantities();
