// API Client Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Helper function to get auth token
const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('auth_token');
    }
    return null;
};

// API Client
export const apiClient = {
    // Auth endpoints
    async register(data: { email: string; password: string; role: string; company_name?: string }) {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Registration failed');
        return response.json();
    },

    async login(email: string, password: string) {
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);

        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData,
        });
        if (!response.ok) throw new Error('Login failed');
        const data = await response.json();

        // Store token
        if (typeof window !== 'undefined' && data.access_token) {
            localStorage.setItem('auth_token', data.access_token);
        }

        return data;
    },

    async getProfile() {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Failed to fetch profile');
        return response.json();
    },

    // Products endpoints
    async getProducts(params?: { skip?: number; limit?: number; status?: string }) {
        const queryParams = new URLSearchParams();
        if (params?.skip) queryParams.append('skip', params.skip.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.status) queryParams.append('status', params.status);

        const response = await fetch(`${API_BASE_URL}/products?${queryParams}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        return response.json();
    },

    async searchProducts(query: string) {
        const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Failed to search products');
        return response.json();
    },

    async getProduct(id: string) {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        return response.json();
    },

    // Orders endpoints
    async createOrder(data: any) {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create order');
        return response.json();
    },

    async getOrders() {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/orders`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Failed to fetch orders');
        return response.json();
    },

    async getOrder(id: string) {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Failed to fetch order');
        return response.json();
    },
};

export default apiClient;
