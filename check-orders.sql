-- Check seller@test.com user ID
SELECT id, email FROM Users WHERE email = 'seller@test.com';

-- Check orders with different seller IDs
SELECT DISTINCT sellerId, COUNT(*) as order_count 
FROM orders 
WHERE sellerId != (SELECT id FROM Users WHERE email = 'seller@test.com');

-- Sample orders to see the data structure
SELECT id, sellerId, userId, productId, status 
FROM orders 
LIMIT 10;
