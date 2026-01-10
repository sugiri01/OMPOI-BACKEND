// API Client for Config and Public Data
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface FeaturedSupplier {
    id: string;
    name: string;
    origin: string;
    stock_location: string;
    quality_badge: string;
    rating: number;
    review_count: number;
    logo_url?: string;
}

export interface SystemConfig {
    key: string;
    value: any;
    category: string;
    description?: string;
}

export const configApi = {
    async getSystemConfig(key: string): Promise<SystemConfig> {
        const response = await fetch(`${API_BASE_URL}/config/system/${key}`);
        if (!response.ok) throw new Error(`Failed to fetch config: ${key}`);
        return response.json();
    },

    async getFeaturedSuppliers(limit: number = 10): Promise<FeaturedSupplier[]> {
        const response = await fetch(`${API_BASE_URL}/config/suppliers/featured?limit=${limit}`);
        if (!response.ok) throw new Error('Failed to fetch featured suppliers');
        return response.json();
    },

    async getOffers() {
        const response = await fetch(`${API_BASE_URL}/config/offers`);
        if (!response.ok) throw new Error('Failed to fetch offers');
        return response.json();
    },

    async getProducts(params: Record<string, any> = {}) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                    value.forEach(v => searchParams.append(key, v));
                } else {
                    searchParams.append(key, String(value));
                }
            }
        });

        const response = await fetch(`${API_BASE_URL}/products?${searchParams.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        return response.json();
    }
};

export interface Product {
    id: string;
    name: string;
    origin: string;
    price_per_kg: number;
    rating: number;
    review_count: number;
    is_primo: boolean;
    stock_location: string;
    lead_time: string;
    certifications: string[];
    specifications_json: any;
    specification_details: {
        nut_count: string;
    }
    seller_id: string;
    currency: string;
}
