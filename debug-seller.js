const { sequelize } = require('./backend/src/config/db.js');
const User = require('./backend/src/database/models/users.js');

async function debugSeller() {
  try {
    const user = await User.findOne({ where: { email: 'seller@test.com' } });
    if (user) {
      console.log('Seller user ID:', user.id);
      
      // Check what orders this seller should see
      const orders = await sequelize.query('SELECT * FROM orders WHERE sellerId = :sellerId', {
        replacements: { sellerId: user.id },
        type: sequelize.QueryTypes.SELECT
      });
      
      console.log('Orders that should be visible to seller:', orders[0].length);
      
      // Check if there are orders with different sellerIds
      const uniqueSellerIds = [...new Set(orders[0].map(order => order.sellerId))];
      console.log('Unique seller IDs in orders:', uniqueSellerIds);
      
      // Show some sample orders
      orders[0].slice(0, 5).forEach((order, index) => {
        console.log(`Order ${index + 1}:`, {
          id: order.id,
          sellerId: order.sellerId,
          userId: order.userId,
          productId: order.productId,
          status: order.status
        });
      });
      
    } else {
      console.log('Seller user not found');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

debugSeller().then(() => {
  process.exit(0);
});
