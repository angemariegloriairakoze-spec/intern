// Admin Dashboard JavaScript
let currentUser = null;
let authToken = localStorage.getItem('authToken');

// Check authentication and admin role
async function checkAuth() {
    if (!authToken) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await api.getSingleUser(authToken);
        if (response.role !== 'admin') {
            alert('Access denied. Admin privileges required.');
            window.location.href = 'dashboard.html';
            return;
        }
        
        currentUser = response;
        updateAdminInfo();
        loadDashboard();
    } catch (error) {
        console.error('Auth check failed:', error);
        window.location.href = 'login.html';
    }
}

// Update admin info in header
function updateAdminInfo() {
    const adminName = document.getElementById('admin-name');
    const adminAvatar = document.getElementById('admin-avatar');
    
    if (currentUser) {
        adminName.textContent = currentUser.fullName;
        adminAvatar.textContent = currentUser.fullName.charAt(0).toUpperCase();
    }
}

// Navigation handling
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = e.target.closest('.nav-link').dataset.section;
        if (section) {
            showSection(section);
            updateActiveNav(e.target.closest('.nav-link'));
        }
    });
});

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        document.getElementById('page-title').textContent = getSectionTitle(sectionId);
        
        // Load section data
        loadSectionData(sectionId);
    }
}

function updateActiveNav(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function getSectionTitle(sectionId) {
    const titles = {
        dashboard: 'Admin Dashboard',
        users: 'Users Management',
        products: 'Products Management',
        shops: 'Shops Management',
        orders: 'Orders Management',
        notifications: 'Notifications Management'
    };
    return titles[sectionId] || 'Admin Dashboard';
}

async function loadSectionData(sectionId) {
    switch (sectionId) {
        case 'dashboard':
            await loadDashboard();
            break;
        case 'users':
            await loadUsers();
            break;
        case 'products':
            await loadProducts();
            break;
        case 'shops':
            await loadShops();
            break;
        case 'orders':
            await loadOrders();
            break;
        case 'notifications':
            await loadNotifications();
            break;
    }
}

// Dashboard data loading
async function loadDashboard() {
    try {
        const [users, products, orders, shops] = await Promise.all([
            api.getAllUsers(authToken),
            api.getAllProducts(authToken),
            api.getAllOrders(authToken),
            api.getAllShops(authToken)
        ]);

        document.getElementById('total-users').textContent = users.length;
        document.getElementById('total-products').textContent = products.length;
        document.getElementById('total-orders').textContent = orders.length;
        document.getElementById('total-shops').textContent = shops.length;
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Users data loading
async function loadUsers() {
    const loading = document.getElementById('users-loading');
    const error = document.getElementById('users-error');
    const content = document.getElementById('users-content');
    const tbody = document.getElementById('users-table-body');

    loading.classList.remove('hidden');
    error.classList.add('hidden');
    content.classList.add('hidden');

    try {
        const users = await api.getAllUsers(authToken);
        
        tbody.innerHTML = users.map(user => `
            <tr>
                <td>${user.fullName}</td>
                <td>${user.email}</td>
                <td>${user.phoneNumber}</td>
                <td><span class="badge ${user.role}">${user.role}</span></td>
                <td>${user.location}</td>
                <td>
                    <button class="btn btn-primary" onclick="viewUser('${user.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                </td>
            </tr>
        `).join('');

        loading.classList.add('hidden');
        content.classList.remove('hidden');
    } catch (err) {
        loading.classList.add('hidden');
        error.textContent = 'Failed to load users: ' + err.message;
        error.classList.remove('hidden');
    }
}

// Products data loading
async function loadProducts() {
    const loading = document.getElementById('products-loading');
    const error = document.getElementById('products-error');
    const content = document.getElementById('products-content');
    const tbody = document.getElementById('products-table-body');

    loading.classList.remove('hidden');
    error.classList.add('hidden');
    content.classList.add('hidden');

    try {
        const products = await api.getAllProducts(authToken);
        
        tbody.innerHTML = products.map(product => `
            <tr>
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td>${product.quantity || 0}</td>
                <td>${product.size}</td>
                <td>${product.type}</td>
                <td><span class="badge">${product.status}</span></td>
                <td>${product.shop_name || 'N/A'}</td>
            </tr>
        `).join('');

        loading.classList.add('hidden');
        content.classList.remove('hidden');
    } catch (err) {
        loading.classList.add('hidden');
        error.textContent = 'Failed to load products: ' + err.message;
        error.classList.remove('hidden');
    }
}

// Shops data loading
async function loadShops() {
    const loading = document.getElementById('shops-loading');
    const error = document.getElementById('shops-error');
    const content = document.getElementById('shops-content');
    const tbody = document.getElementById('shops-table-body');

    loading.classList.remove('hidden');
    error.classList.add('hidden');
    content.classList.add('hidden');

    try {
        const shops = await api.getAllShops(authToken);
        
        tbody.innerHTML = shops.map(shop => `
            <tr>
                <td>${shop.name}</td>
                <td>${shop.owner_name || 'N/A'}</td>
                <td>${shop.email || 'N/A'}</td>
                <td>${shop.phone || 'N/A'}</td>
                <td>${shop.location || 'N/A'}</td>
            </tr>
        `).join('');

        loading.classList.add('hidden');
        content.classList.remove('hidden');
    } catch (err) {
        loading.classList.add('hidden');
        error.textContent = 'Failed to load shops: ' + err.message;
        error.classList.remove('hidden');
    }
}

// Orders data loading
async function loadOrders() {
    const loading = document.getElementById('orders-loading');
    const error = document.getElementById('orders-error');
    const content = document.getElementById('orders-content');
    const tbody = document.getElementById('orders-table-body');

    loading.classList.remove('hidden');
    error.classList.add('hidden');
    content.classList.add('hidden');

    try {
        const orders = await api.getAllOrders(authToken);
        
        tbody.innerHTML = orders.map(order => `
            <tr>
                <td>${order.customer_name || 'N/A'}</td>
                <td>${order.product_name || 'N/A'}</td>
                <td>${order.quantity}</td>
                <td>$${order.totalAmount}</td>
                <td><span class="badge">${order.status}</span></td>
                <td>${new Date(order.orderDate).toLocaleDateString()}</td>
            </tr>
        `).join('');

        loading.classList.add('hidden');
        content.classList.remove('hidden');
    } catch (err) {
        loading.classList.add('hidden');
        error.textContent = 'Failed to load orders: ' + err.message;
        error.classList.remove('hidden');
    }
}

// Notifications data loading
async function loadNotifications() {
    const loading = document.getElementById('notifications-loading');
    const error = document.getElementById('notifications-error');
    const content = document.getElementById('notifications-content');
    const tbody = document.getElementById('notifications-table-body');

    loading.classList.remove('hidden');
    error.classList.add('hidden');
    content.classList.add('hidden');

    try {
        const notifications = await api.getNotifications(authToken);
        
        tbody.innerHTML = notifications.map(notification => `
            <tr>
                <td>${notification.title}</td>
                <td>${notification.message.substring(0, 50)}...</td>
                <td><span class="badge">${notification.type}</span></td>
                <td>${notification.user_name || 'N/A'}</td>
                <td>${new Date(notification.createdAt).toLocaleDateString()}</td>
            </tr>
        `).join('');

        loading.classList.add('hidden');
        content.classList.remove('hidden');
    } catch (err) {
        loading.classList.add('hidden');
        error.textContent = 'Failed to load notifications: ' + err.message;
        error.classList.remove('hidden');
    }
}

// View user details
function viewUser(userId) {
    // Implement user details modal or redirect
    console.log('View user:', userId);
    alert('User details feature coming soon!');
}

// Logout function
function logout() {
    localStorage.removeItem('authToken');
    window.location.href = 'login.html';
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});
