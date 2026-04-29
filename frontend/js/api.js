const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api'

const api = {
    // AUTHENTICATION ENDPOINTS
    login: async function(email, password) {
        return fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(res => res.json());
    },

    register: async function(userData) {
        return fetch(`${API_URL}/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then(res => res.json());
    },

    // USER ENDPOINTS
    getAllUsers: async function() {
        return fetch(`${API_URL}/getAllUsers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json());
    },

    getSingleUser: async function(userId) {
        return fetch(`${API_URL}/getSingleUser/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json());
    },

    getCurrentUser: async function() {
        return fetch(`${API_URL}/getSingleUser/current`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json());
    },

    updateUser: async function(userId, userData) {
        return fetch(`${API_URL}/updateUser/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(userData)
        }).then(res => res.json());
    },

    deleteUser: async function(userId) {
        return fetch(`${API_URL}/deleteUser/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json());
    },

    // SHOP ENDPOINTS
    getAllShops: async function() {
        return fetch(`${API_URL}/getAllShops`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json());
    },

    getSingleShop: async function(shopId) {
        return fetch(`${API_URL}/getSingleShop/${shopId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json());
    },

    createShop: async function(shopData) {
        return fetch(`${API_URL}/createShop`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(shopData)
        }).then(res => res.json());
    },

    updateShop: async function(shopId, shopData) {
        return fetch(`${API_URL}/updateShop/${shopId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(shopData)
        }).then(res => res.json());
    },

    deleteShop: async function(shopId) {
        return fetch(`${API_URL}/deleteShop/${shopId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json());
    },

    getOwnerShops: async function() {
        return fetch(`${API_URL}/getOwnerShops`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json());
    },

    // PRODUCT ENDPOINTS
    getAllProducts: async function() {
        return fetch(`${API_URL}/getAllProducts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json());
    },

    getSingleProduct: async function(productId) {
        return fetch(`${API_URL}/getSingleProduct/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json());
    },

    createProduct: async function(productData) {
        return fetch(`${API_URL}/createProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(productData)
        }).then(res => res.json());
    },

    createOrderProduct: async function(productData) {
        return fetch(`${API_URL}/createOrderProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(productData)
        }).then(res => res.json());
    },

    updateProduct: async function(productId, productData) {
        return fetch(`${API_URL}/updateProduct/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(productData)
        }).then(res => res.json());
    },

    deleteProduct: async function(productId) {
        return fetch(`${API_URL}/deleteProduct/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json());
    },

    // ORDER ENDPOINTS
    getAllOrders: async function() {
        return fetch(`${API_URL}/getAllOrders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json());
    },

    getSingleOrder: async function(orderId) {
        return fetch(`${API_URL}/getSingleOrder/${orderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json());
    },

    createOrder: async function(orderData) {
        return fetch(`${API_URL}/createOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(orderData)
        }).then(res => res.json());
    },

    updateOrderStatus: async function(orderId, status) {
        return fetch(`${API_URL}/updateOrderStatus/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ status })
        }).then(res => res.json());
    },

    deleteOrder: async function(orderId) {
        return fetch(`${API_URL}/deleteOrder/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json());
    },

    getCustomerOrders: async function() {
        return fetch(`${API_URL}/getCustomerOrders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json());
    },

    getSellerOrders: async function() {
        return fetch(`${API_URL}/getSellerOrders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json());
    },

    // NOTIFICATION ENDPOINTS
    getNotifications: async function() {
        return fetch(`${API_URL}/getNotifications`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json());
    },

    markNotificationRead: async function(notificationId) {
        return fetch(`${API_URL}/markNotificationRead/${notificationId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json());
    },

    deleteNotification: async function(notificationId) {
        return fetch(`${API_URL}/deleteNotification/${notificationId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json());
    }
};
