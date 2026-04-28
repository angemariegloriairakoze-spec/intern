import axios from 'axios'

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('token')
      window.location.href = '/login.html'
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const authAPI = {
  login: (email, password) => api.post('/login', { email, password }),
  register: (userData) => api.post('/createUser', userData)
}

export const userAPI = {
  getAllUsers: () => api.get('/getAllUsers'),
  getSingleUser: (userId) => api.get(`/getSingleUser/${userId}`),
  updateUser: (userId, userData) => api.put(`/updateUser/${userId}`, userData),
  deleteUser: (userId) => api.delete(`/deleteUser/${userId}`)
}

export const shopAPI = {
  getAllShops: () => api.get('/getAllShops'),
  getSingleShop: (shopId) => api.get(`/getSingleShop/${shopId}`),
  createShop: (shopData) => api.post('/createShop', shopData),
  updateShop: (shopId, shopData) => api.put(`/updateShop/${shopId}`, shopData),
  deleteShop: (shopId) => api.delete(`/deleteShop/${shopId}`),
  getOwnerShops: () => api.get('/getOwnerShops')
}

export const productAPI = {
  getAllProducts: () => api.get('/getAllProducts'),
  getSingleProduct: (productId) => api.get(`/getSingleProduct/${productId}`),
  createProduct: (productData) => api.post('/createProduct', productData),
  createOrderProduct: (productData) => api.post('/createOrderProduct', productData),
  updateProduct: (productId, productData) => api.put(`/updateProduct/${productId}`, productData),
  deleteProduct: (productId) => api.delete(`/deleteProduct/${productId}`)
}

export const orderAPI = {
  getAllOrders: () => api.get('/getAllOrders'),
  getSingleOrder: (orderId) => api.get(`/getSingleOrder/${orderId}`),
  createOrder: (orderData) => api.post('/createOrder', orderData),
  updateOrderStatus: (orderId, status) => api.put(`/updateOrderStatus/${orderId}`, { status }),
  deleteOrder: (orderId) => api.delete(`/deleteOrder/${orderId}`),
  getCustomerOrders: () => api.get('/getCustomerOrders'),
  getSellerOrders: () => api.get('/getSellerOrders')
}

export const notificationAPI = {
  getNotifications: () => api.get('/getNotifications'),
  markNotificationRead: (notificationId) => api.put(`/markNotificationRead/${notificationId}`),
  deleteNotification: (notificationId) => api.delete(`/deleteNotification/${notificationId}`)
}

export default api
