# Notification Testing Guide with Swagger

## Overview
Your system has notifications working for both sellers and customers:
- **Seller gets notified** when customer creates an order
- **Customer gets notified** when seller approves/denies order

## Step-by-Step Testing Guide

### 1. Start Your Server
```bash
npm run dev
```
Server runs on: `http://localhost:5000`
Swagger UI: `http://localhost:5000/api-docs`

### 2. Create Test Accounts

#### Create Seller Account
```http
POST /api/register
{
  "fullName": "Test Seller",
  "email": "seller@test.com",
  "password": "password123",
  "role": "seller",
  "phoneNumber": "0781234567",
  "location": "Kigali",
  "gender": "male"
}
```

#### Create Customer Account
```http
POST /api/register
{
  "fullName": "Test Customer",
  "email": "customer@test.com",
  "password": "password123",
  "role": "customer",
  "phoneNumber": "0781234568",
  "location": "Kigali",
  "gender": "female"
}
```

### 3. Login and Get Tokens

#### Seller Login
```http
POST /api/login
{
  "email": "seller@test.com",
  "password": "password123"
}
```
Copy the seller token.

#### Customer Login
```http
POST /api/login
{
  "email": "customer@test.com",
  "password": "password123"
}
```
Copy the customer token.

### 4. Create Shop (as Seller)
```http
POST /api/createShop
Authorization: Bearer SELLER_TOKEN
{
  "name": "Test Shop",
  "description": "A test shop for products",
  "contact": "0781234567",
  "location": "Kigali"
}
```

### 5. Create Product (as Seller)
```http
POST /api/createProduct
Authorization: Bearer SELLER_TOKEN
{
  "name": "Test Product",
  "size": "large",
  "price": "50",
  "forShop": "SHOP_ID_FROM_STEP_4"
}
```

### 6. Test Order Creation (Customer Creates Order)
```http
POST /api/createOrder
Authorization: Bearer CUSTOMER_TOKEN
{
  "shopName": "Test Shop",
  "productName": "Test Product",
  "size": "large",
  "quantity": 2
}
```

### 7. Check Seller Notifications
```http
GET /api/getNotifications
Authorization: Bearer SELLER_TOKEN
```
**Expected:** Seller should have a "New Order Received" notification.

### 8. Approve Order (Seller Action)
```http
PUT /api/updateOrderStatus/{order_id}
Authorization: Bearer SELLER_TOKEN
{
  "status": "approved"
}
```

### 9. Check Customer Notifications
```http
GET /api/getNotifications
Authorization: Bearer CUSTOMER_TOKEN
```
**Expected:** Customer should have an "Order Approved" notification.

### 10. Test Denial (Optional)
```http
PUT /api/updateOrderStatus/{order_id}
Authorization: Bearer SELLER_TOKEN
{
  "status": "denied"
}
```
Customer will receive "Order Denied" notification.

## Additional Notification Endpoints

### Mark Notification as Read
```http
PUT /api/markNotificationRead/{notification_id}
Authorization: Bearer USER_TOKEN
```

### Delete Notification
```http
DELETE /api/deleteNotification/{notification_id}
Authorization: Bearer USER_TOKEN
```

### Get Unread Count
```http
GET /api/getUnreadCount
Authorization: Bearer USER_TOKEN
```

## Expected Notification Flow

1. **Customer creates order** 
   - Seller receives: "New Order Received"

2. **Seller approves order**
   - Customer receives: "Order Approved"

3. **Seller denies order**
   - Customer receives: "Order Denied"

## Troubleshooting

- **No notifications?** Check both seller and customer notification endpoints
- **Access denied?** Ensure correct user roles and tokens
- **Order not found?** Verify product exists with exact name and size

## Tips for Testing

1. Use different browsers for seller and customer to avoid token confusion
2. Check notifications after each step
3. Verify notification messages contain correct order details
4. Test both approval and denial scenarios
