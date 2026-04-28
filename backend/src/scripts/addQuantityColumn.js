import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';

const addQuantityColumn = async () => {
    try {
        console.log('Connecting to database...');
        await sequelize.authenticate();
        console.log('Database connected successfully!');

        // Add the quantity column to the products table
        const queryInterface = sequelize.getQueryInterface();
        
        // Check if column already exists
        const tableDescription = await queryInterface.describeTable('products');
        
        if (tableDescription.quantity) {
            console.log('Quantity column already exists in products table');
        } else {
            console.log('Adding quantity column to products table...');
            await queryInterface.addColumn(
                'products',
                'quantity',
                {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                }
            );
            console.log('Quantity column added successfully!');
        }

        // Now update existing products with random quantities
        console.log('Updating existing products with quantities...');
        
        // Use raw SQL to update all products with random quantities
        await sequelize.query(`
            UPDATE products 
            SET quantity = FLOOR(1 + RAND() * 100) 
            WHERE quantity = 0 OR quantity IS NULL
        `);
        
        console.log('All products have been updated with random quantities (1-100)!');

        // Show updated products
        const [results] = await sequelize.query(`
            SELECT id, name, quantity 
            FROM products 
            ORDER BY name
        `);
        
        console.log('\n=== Updated Products ===');
        results.forEach(product => {
            console.log(`ID: ${product.id}, Name: ${product.name}, Quantity: ${product.quantity}`);
        });

    } catch (error) {
        console.error('Error adding quantity column:', error);
    } finally {
        await sequelize.close();
        console.log('Database connection closed.');
    }
};

addQuantityColumn();
