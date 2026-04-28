import { sequelize } from '../database/connection.js';
import Product from '../database/models/products.js';
import Shop from '../database/models/shops.js';
import { seedShops } from '../database/seeds/shopSeed.js';
import { seedProducts } from '../database/seeds/productSeed.js';

const cleanAndReseed = async () => {
    try {
        console.log('Starting database cleanup and reseed...');
        
        // Connect to database
        await sequelize.authenticate();
        console.log('Database connected successfully.');
        
        // Delete all existing products
        await Product.destroy({ where: {}, force: true });
        console.log('All existing products deleted.');
        
        // Re-seed shops first
        await seedShops();
        console.log('Shops re-seeded successfully.');
        
        // Then seed products
        await seedProducts();
        console.log('Products re-seeded successfully.');
        
        console.log('Cleanup and reseed completed successfully!');
        
    } catch (error) {
        console.error('Error during cleanup and reseed:', error);
    } finally {
        await sequelize.close();
    }
};

cleanAndReseed();
