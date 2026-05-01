import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../services/api'

const AdminDashboard = () => {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState('dashboard')
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    shops: 0
  })
  const [data, setData] = useState({
    users: [],
    products: [],
    orders: [],
    shops: [],
    notifications: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [users, products, orders, shops] = await Promise.all([
        api.getAllUsers(),
        api.getAllProducts(),
        api.getAllOrders(),
        api.getAllShops()
      ])

      setStats({
        users: users.length,
        products: products.length,
        orders: orders.length,
        shops: shops.length
      })

      setData({
        users,
        products,
        orders,
        shops,
        notifications: []
      })
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderSidebar = () => (
    <aside className="w-64 bg-white bg-opacity-95 backdrop-blur-lg border-r border-white border-opacity-20 p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
          Angel's M
        </h2>
        <p className="text-gray-600">Admin Panel</p>
      </div>
      
      <nav className="space-y-2">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: '📊' },
          { id: 'users', label: 'Users', icon: '👥' },
          { id: 'products', label: 'Products', icon: '📦' },
          { id: 'shops', label: 'Shops', icon: '🏪' },
          { id: 'orders', label: 'Orders', icon: '🛒' },
          { id: 'notifications', label: 'Notifications', icon: '🔔' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              activeSection === item.id
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )

  const renderStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="card text-center">
        <div className="text-3xl mb-2">👥</div>
        <h3 className="text-2xl font-bold text-primary-600">{stats.users}</h3>
        <p className="text-gray-600">Total Users</p>
      </div>
      <div className="card text-center">
        <div className="text-3xl mb-2">📦</div>
        <h3 className="text-2xl font-bold text-pink-600">{stats.products}</h3>
        <p className="text-gray-600">Total Products</p>
      </div>
      <div className="card text-center">
        <div className="text-3xl mb-2">🛒</div>
        <h3 className="text-2xl font-bold text-blue-600">{stats.orders}</h3>
        <p className="text-gray-600">Total Orders</p>
      </div>
      <div className="card text-center">
        <div className="text-3xl mb-2">🏪</div>
        <h3 className="text-2xl font-bold text-green-600">{stats.shops}</h3>
        <p className="text-gray-600">Total Shops</p>
      </div>
    </div>
  )

  const renderUsersTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.fullName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.phoneNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`badge badge-${user.role}`}>
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.location}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderProductsTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {product.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${product.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.quantity || 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.size}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="badge bg-blue-500 text-white">
                  {product.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderOrdersTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {order.customer_name || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.product_name || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${order.totalAmount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`badge ${
                  order.status === 'approved' ? 'bg-green-500' : 
                  order.status === 'denied' ? 'bg-red-500' : 'bg-yellow-500'
                } text-white`}>
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(order.orderDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      )
    }

    switch (activeSection) {
      case 'dashboard':
        return renderStats()
      case 'users':
        return renderUsersTable()
      case 'products':
        return renderProductsTable()
      case 'orders':
        return renderOrdersTable()
      case 'shops':
        return (
          <div className="text-center text-gray-600">
            Shops management coming soon...
          </div>
        )
      case 'notifications':
        return (
          <div className="text-center text-gray-600">
            Notifications management coming soon...
          </div>
        )
      default:
        return renderStats()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500">
      <div className="flex">
        {renderSidebar()}
        
        <main className="flex-1 p-8">
          <header className="mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-white capitalize">
                {activeSection}
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-white">{user?.fullName}</span>
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.fullName?.charAt(0)?.toUpperCase()}
                </div>
              </div>
            </div>
          </header>
          
          <div className="card">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
