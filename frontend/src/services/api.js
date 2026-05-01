import axios from 'axios'

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api'

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const api = {
  // AUTHENTICATION ENDPOINTS
  login: async (email, password) => {
    const response = await apiClient.post('/login', { email, password })
    return response.data
  },

  register: async (userData) => {
    const response = await apiClient.post('/createUser', userData)
    return response.data
  },

  // USER ENDPOINTS
  getAllUsers: async () => {
    const response = await apiClient.get('/getAllUsers')
    return response.data
  },

  getSingleUser: async (token) => {
    const response = await apiClient.get('/getSingleUser/' + token)
    return response.data
  },

  updateUser: async (userId, userData) => {
    const response = await apiClient.put(`/updateUser/${userId}`, userData)
    return response.data
  },

  deleteUser: async (userId) => {
    const response = await apiClient.delete(`/deleteUser/${userId}`)
    return response.data
  },

  // PRODUCT ENDPOINTS
  getAllProducts: async () => {
    const response = await apiClient.get('/getAllProducts')
    return response.data
  },

  getSingleProduct: async (productId) => {
    const response = await apiClient.get(`/getSingleProduct/${productId}`)
    return response.data
  },

  createProduct: async (productData) => {
    const response = await apiClient.post('/createProduct', productData)
    return response.data
  },

  updateProduct: async (productId, productData) => {
    const response = await apiClient.put(`/updateProduct/${productId}`, productData)
    return response.data
  },

  deleteProduct: async (productId) => {
    const response = await apiClient.delete(`/deleteProduct/${productId}`)
    return response.data
  },

  // SHOP ENDPOINTS
  getAllShops: async () => {
    const response = await apiClient.get('/getAllShops')
    return response.data
  },

  getSingleShop: async (shopId) => {
    const response = await apiClient.get(`/getSingleShop/${shopId}`)
    return response.data
  },

  createShop: async (shopData) => {
    const response = await apiClient.post('/createShop', shopData)
    return response.data
  },

  updateShop: async (shopId, shopData) => {
    const response = await apiClient.put(`/updateShop/${shopId}`, shopData)
    return response.data
  },

  deleteShop: async (shopId) => {
    const response = await apiClient.delete(`/deleteShop/${shopId}`)
    return response.data
  },

  getOwnerShops: async () => {
    const response = await apiClient.get('/getOwnerShops')
    return response.data
  },

  // ORDER ENDPOINTS
  getAllOrders: async () => {
    const response = await apiClient.get('/getAllOrders')
    return response.data
  },

  getSingleOrder: async (orderId) => {
    const response = await apiClient.get(`/getSingleOrder/${orderId}`)
    return response.data
  },

  createOrder: async (orderData) => {
    const response = await apiClient.post('/createOrder', orderData)
    return response.data
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await apiClient.put(`/updateOrderStatus/${orderId}`, { status })
    return response.data
  },

  deleteOrder: async (orderId) => {
    const response = await apiClient.delete(`/deleteOrder/${orderId}`)
    return response.data
  },

  getCustomerOrders: async () => {
    const response = await apiClient.get('/getCustomerOrders')
    return response.data
  },

  getSellerOrders: async () => {
    const response = await apiClient.get('/getSellerOrders')
    return response.data
  },

  // NOTIFICATION ENDPOINTS
  getNotifications: async () => {
    const response = await apiClient.get('/getNotifications')
    return response.data
  },

  markNotificationRead: async (notificationId) => {
    const response = await apiClient.put(`/markNotificationRead/${notificationId}`)
    return response.data
  },

  deleteNotification: async (notificationId) => {
    const response = await apiClient.delete(`/deleteNotification/${notificationId}`)
    return response.data
  },

  getUnreadCount: async () => {
    const response = await apiClient.get('/getUnreadCount')
    return response.data
  }
}
