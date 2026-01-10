/**
 * API client for fetching configuration data from backend
 */

import { API_ENDPOINTS } from '../constants';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Types
export interface Offer {
    id: string;
    code: string;
    title: string;
    description?: string;
    discount_type: 'percentage' | 'fixed';
    discount_value: number;
    min_order_value?: number;
    max_discount?: number;
    product_type?: string;
    valid_from: string;
    valid_until: string;
    is_active: boolean;
    usage_limit?: number;
    usage_count: number;
    created_at: string;
    updated_at: string;
}

export interface FeaturedSupplier {
    id: string;
    name: string;
    origin: string;
    stock_location: string;
    quality_badge: string;
    rating: number;
    review_count: number;
    is_active: boolean;
    display_order: number;
    logo_url?: string;
    extra_data?: Record<string, any>;
    created_at: string;
    updated_at: string;
}

export interface Country {
    id: string;
    name: string;
    code: string;
    region?: string;
    is_supported: boolean;
    supports_registration: boolean;
    supports_shipping: boolean;
    currency_code?: string;
    phone_code?: string;
    display_order: number;
    extra_data?: Record<string, any>;
    created_at: string;
    updated_at: string;
}

export interface SystemConfigValue {
    key: string;
    value: string | number | boolean | object;
    category: string;
    description?: string;
}

// API Client Functions
export async function fetchOffers(productType?: string): Promise<Offer[]> {
    try {
        const url = new URL(`${API_BASE_URL}${API_ENDPOINTS.OFFERS}`);
        if (productType) {
            url.searchParams.append('product_type', productType);
        }

        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(`Failed to fetch offers: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching offers:', error);
        return [];
    }
}

export async function fetchFeaturedSuppliers(limit: number = 10): Promise<FeaturedSupplier[]> {
    try {
        const url = new URL(`${API_BASE_URL}${API_ENDPOINTS.FEATURED_SUPPLIERS}`);
        url.searchParams.append('limit', limit.toString());

        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(`Failed to fetch suppliers: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching featured suppliers:', error);
        return [];
    }
}

export async function fetchCountries(options?: {
    supportsRegistration?: boolean;
    supportsShipping?: boolean;
}): Promise<Country[]> {
    try {
        const url = new URL(`${API_BASE_URL}${API_ENDPOINTS.COUNTRIES}`);

        if (options?.supportsRegistration !== undefined) {
            url.searchParams.append('supports_registration', options.supportsRegistration.toString());
        }

        if (options?.supportsShipping !== undefined) {
            url.searchParams.append('supports_shipping', options.supportsShipping.toString());
        }

        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(`Failed to fetch countries: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching countries:', error);
        return [];
    }
}

export async function fetchSystemConfig(key: string): Promise<SystemConfigValue | null> {
    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.SYSTEM_CONFIG}/${key}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch system config: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching system config '${key}':`, error);
        return null;
    }
}

export async function fetchSystemConfigByCategory(category: string): Promise<Record<string, any>> {
    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.SYSTEM_CONFIG}/category/${category}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch system config category: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching system config category '${category}':`, error);
        return {};
    }
}
